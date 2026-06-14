import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home";
import ApplyPage from "@/pages/apply";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminApplications from "@/pages/admin/applications-list";
import AdminApplicationDetail from "@/pages/admin/application-detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<ApplyPage />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/applications/:id" element={<AdminApplicationDetail />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
