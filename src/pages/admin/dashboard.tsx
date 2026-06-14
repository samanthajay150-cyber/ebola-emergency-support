import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Activity,
} from "lucide-react";
import Layout from "@/components/admin/AdminLayout";

interface DashboardStats {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
  recent: Array<{
    application_id: string;
    full_name: string;
    status: string;
    created_at: string;
  }>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      under_review: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-6">
        {/* Header with Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
            <img
              src="/images/hero-healthcare-workers.jpg"
              alt="Healthcare Workers"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-xl opacity-90">Monitor and manage Ebola emergency applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.total || 0}</p>
              </div>
              <FileText className="h-12 w-12 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.pending || 0}</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.approved || 0}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Rejected</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.rejected || 0}</p>
              </div>
              <XCircle className="h-12 w-12 text-red-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
            <button
              onClick={() => navigate("/admin/applications")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Application ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recent?.map((app) => (
                  <tr key={app.application_id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{app.application_id}</td>
                    <td className="py-3 px-4">{app.full_name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => navigate(`/admin/applications/${app.application_id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
