import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  LogOut,
  Menu,
  X,
  Activity,
  Settings,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Fetch pending count for badge
    fetchPendingCount();
    
    // Set up interval to refresh count
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPendingCount = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const stats = await response.json();
        setPendingCount(stats.pending || 0);
      }
    } catch (error) {
      console.error("Failed to fetch pending count:", error);
    }
  };

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/admin/dashboard",
    },
    {
      label: "All Applications",
      icon: <FileText className="h-5 w-5" />,
      path: "/admin/applications",
    },
    {
      label: "Pending Review",
      icon: <Clock className="h-5 w-5" />,
      path: "/admin/applications?status=pending",
      badge: pendingCount,
    },
    {
      label: "Under Review",
      icon: <AlertTriangle className="h-5 w-5" />,
      path: "/admin/applications?status=under_review",
    },
    {
      label: "Approved",
      icon: <CheckCircle className="h-5 w-5" />,
      path: "/admin/applications?status=approved",
    },
    {
      label: "Rejected",
      icon: <XCircle className="h-5 w-5" />,
      path: "/admin/applications?status=rejected",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("ebola_admin_token");
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    if (path.includes("?")) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Admin Portal</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Admin Portal</h1>
              <p className="text-xs text-gray-500">Ebola Emergency Support</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                isActive(item.path)
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="min-h-screen">
          {/* Top Bar */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Ebola Emergency Support Administration
              </h2>
              <p className="text-sm text-gray-500">
                Manage applications and approval workflows
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5 text-gray-600" />
                {pendingCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-8">{children}</div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
