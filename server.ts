import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import { randomBytes } from "node:crypto";
import postgres from "postgres";

const app = new Hono();

// Database connection
const sql = postgres(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_bepP0kniUfc1@ep-steep-tree-aiuw9mx0-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require");

// Enable CORS
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Initialize database tables
async function initDatabase() {
  try {
    // Applications table
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        application_id TEXT UNIQUE NOT NULL,
        ready_to_proceed BOOLEAN NOT NULL,
        first_time_applicant BOOLEAN NOT NULL,
        heard_about_funds TEXT NOT NULL,
        other_source TEXT,
        occupation TEXT NOT NULL,
        other_occupation TEXT,
        full_name TEXT NOT NULL,
        age INTEGER NOT NULL,
        email TEXT,
        phone_number TEXT,
        country TEXT NOT NULL,
        state TEXT NOT NULL,
        town TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        reviewed_at TEXT,
        reviewed_by TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Applications table created/verified");

    // Admin users table
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `;
    console.log("Admin users table created/verified");

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at)`;
    console.log("Indexes created/verified");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

initDatabase();

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "ebola2026admin",
};

// ==================== API ROUTES ====================

// Admin login
app.post("/api/admin/login", async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const token = randomBytes(32).toString("hex");
      return c.json({
        success: true,
        token,
        user: { username: ADMIN_CREDENTIALS.username },
      });
    }

    return c.json({ success: false, error: "Invalid credentials" }, 401);
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ success: false, error: "Server error" }, 500);
  }
});

// Submit application
app.post("/api/applications", async (c) => {
  try {
    const body = await c.req.json();
    const applicationId = `EBM-${new Date().getFullYear()}-${randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;

    await sql`
      INSERT INTO applications (
        application_id, ready_to_proceed, first_time_applicant,
        heard_about_funds, other_source, occupation, other_occupation,
        full_name, age, email, phone_number, country, state, town
      ) VALUES (
        ${applicationId},
        ${body.readyToProceed},
        ${body.firstTimeApplicant},
        ${body.heardAboutFunds},
        ${body.otherSource || null},
        ${body.occupation},
        ${body.otherOccupation || null},
        ${body.fullName},
        ${body.age},
        ${body.email || null},
        ${body.phoneNumber || null},
        ${body.country},
        ${body.state},
        ${body.town}
      )
    `;

    return c.json({ success: true, applicationId });
  } catch (error) {
    console.error("Application error:", error);
    return c.json({ success: false, error: "Failed to submit application" }, 500);
  }
});

// Get all applications (admin)
app.get("/api/admin/applications", async (c) => {
  try {
    const status = c.req.query("status");
    const search = c.req.query("search");
    const limit = parseInt(c.req.query("limit") || "50");
    const offset = parseInt(c.req.query("offset") || "0");

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramCount = 1;

    if (status) {
      whereClause += ` AND status = $${paramCount++}`;
      params.push(status);
    }

    if (search) {
      whereClause += ` AND (full_name ILIKE $${paramCount} OR application_id ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    const applications = await sql.unsafe(`
      SELECT * FROM applications 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `);

    const total = await sql.unsafe(`
      SELECT COUNT(*) as total FROM applications ${whereClause}
    `);

    return c.json({
      applications,
      total: total[0]?.total || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Fetch applications error:", error);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});

// Get specific application
app.get("/api/admin/applications/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await sql`
      SELECT * FROM applications WHERE id = ${id}
    `;

    if (result.length === 0) {
      return c.json({ error: "Application not found" }, 404);
    }

    return c.json({ application: result[0] });
  } catch (error) {
    console.error("Fetch application error:", error);
    return c.json({ error: "Failed to fetch application" }, 500);
  }
});

// Update application status
app.put("/api/admin/applications/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status, notes, reviewedBy } = body;

    const result = await sql`
      UPDATE applications 
      SET 
        status = ${status},
        notes = ${notes || null},
        reviewed_at = ${new Date().toISOString()},
        reviewed_by = ${reviewedBy || "admin"}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return c.json({ error: "Application not found" }, 404);
    }

    return c.json({ success: true, application: result[0] });
  } catch (error) {
    console.error("Update status error:", error);
    return c.json({ error: "Failed to update status" }, 500);
  }
});

// Get dashboard stats
app.get("/api/admin/stats", async (c) => {
  try {
    const total = await sql`SELECT COUNT(*) as total FROM applications`;
    const pending = await sql`SELECT COUNT(*) as pending FROM applications WHERE status = 'pending'`;
    const underReview = await sql`SELECT COUNT(*) as under_review FROM applications WHERE status = 'under_review'`;
    const approved = await sql`SELECT COUNT(*) as approved FROM applications WHERE status = 'approved'`;
    const rejected = await sql`SELECT COUNT(*) as rejected FROM applications WHERE status = 'rejected'`;
    const recent = await sql`
      SELECT application_id, full_name, status, created_at 
      FROM applications 
      ORDER BY created_at DESC 
      LIMIT 5
    `;

    return c.json({
      total: total[0]?.total || 0,
      pending: pending[0]?.pending || 0,
      underReview: underReview[0]?.under_review || 0,
      approved: approved[0]?.approved || 0,
      rejected: rejected[0]?.rejected || 0,
      recent,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return c.json({ error: "Failed to fetch stats" }, 500);
  }
});

// ==================== STATIC FILE SERVING ====================

// Serve favicon
app.get("/favicon.svg", async (c) => {
  const file = Bun.file("./public/favicon.svg");
  return new Response(file, {
    headers: { "Content-Type": "image/svg+xml" },
  });
});

// In production, serve from dist folder
if (process.env.NODE_ENV === "production") {
  app.use("/images/*", async (c) => {
    const path = c.req.path.replace("/images/", "");
    const filePath = `./dist/images/${path}`;
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }
    return c.notFound();
  });
  
  // Serve static assets from dist/assets
  app.get("/assets/*", async (c) => {
    const path = c.req.path.replace("/assets/", "");
    const filePath = `./dist/assets/${path}`;
    const file = Bun.file(filePath);
    
    if (await file.exists()) {
      const ext = path.split('.').pop();
      const mimeType = ext === 'js' ? 'application/javascript' :
                       ext === 'css' ? 'text/css' :
                       'application/octet-stream';
      
      return new Response(file, {
        headers: { "Content-Type": mimeType },
      });
    }
    
    return c.notFound();
  });
  
  // Serve index.html for all non-API, non-asset routes (SPA)
  app.get("/*", async (c) => {
    const path = c.req.path;
    
    // Skip API routes
    if (path.startsWith("/api/")) {
      return c.notFound();
    }
    
    // Serve index.html from dist
    const html = await Bun.file("./dist/index.html").text();
    return c.html(html);
  });
} else {
  // Development - serve index.html from root (Vite handles the rest)
  app.get("/*", async (c) => {
    const path = c.req.path;
    
    if (path.startsWith("/api/")) {
      return c.notFound();
    }
    
    const html = await Bun.file("./index.html").text();
    return c.html(html);
  });
}

// Export for Bun
export default {
  port: process.env.PORT || 52901,
  fetch: app.fetch,
};
