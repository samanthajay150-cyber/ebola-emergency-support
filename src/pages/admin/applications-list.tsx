import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  ChevronDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Download,
  X,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/admin/AdminLayout";

interface Application {
  id: number;
  application_id: string;
  full_name: string;
  age: number;
  country: string;
  status: string;
  created_at: string;
}

interface PaginatedResponse {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
}

const ApplicationsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, page]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      if (search !== searchParams.get("search")) {
        setPage(1);
        fetchApplications();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      params.append("page", page.toString());
      params.append("limit", "20");

      const response = await fetch(`/api/admin/applications?${params}`);
      
      if (response.ok) {
        const data: PaginatedResponse = await response.json();
        setApplications(data.applications || []);
        setTotalPages(data.totalPages || 1);
      } else {
        toast.error("Failed to load applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchParams(search ? { search } : {});
    fetchApplications();
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPage(1);
    setSearchParams(status ? { status } : {});
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPage(1);
    setSearchParams({});
  };

  const exportToCSV = async () => {
    try {
      const response = await fetch("/api/admin/applications");
      if (response.ok) {
        const data = await response.json();
        const csv = [
          "Application ID,Name,Age,Country,Status,Submitted",
          ...(data.applications || []).map((app: Application) =>
            `${app.application_id},${app.full_name},${app.age},${app.country},${app.status},${app.created_at}`
          ),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `applications-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success("Applications exported successfully");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export applications");
    }
  };

  const getStatusStyle = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <Clock className="h-4 w-4" />,
      },
      under_review: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <AlertTriangle className="h-4 w-4" />,
      },
      approved: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckCircle className="h-4 w-4" />,
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <XCircle className="h-4 w-4" />,
      },
    };

    return styles[status] || styles.pending;
  };

  const statusTabs = [
    { value: "", label: "All", count: null },
    { value: "pending", label: "Pending", color: "yellow" },
    { value: "under_review", label: "Under Review", color: "blue" },
    { value: "approved", label: "Approved", color: "green" },
    { value: "rejected", label: "Rejected", color: "red" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-500 mt-1">
              Monitor and manage Ebola Emergency Support applications
            </p>
          </div>

          <Button
            onClick={exportToCSV}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by ID or name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>

              {/* Status Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(search || statusFilter) && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleStatusFilter(tab.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    statusFilter === tab.value
                      ? tab.color === "yellow"
                        ? "bg-yellow-600 text-white"
                        : tab.color === "blue"
                        ? "bg-blue-600 text-white"
                        : tab.color === "green"
                        ? "bg-green-600 text-white"
                        : tab.color === "red"
                        ? "bg-red-600 text-white"
                        : "bg-slate-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No applications found</p>
                {(search || statusFilter) && (
                  <Button onClick={clearFilters} variant="outline" className="mt-4">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                        Application ID
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                        Applicant
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                        Age
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                        Country
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                        Submitted
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {applications.map((app) => {
                      const statusStyle = getStatusStyle(app.status);
                      return (
                        <tr
                          key={app.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <span className="font-mono text-sm font-medium text-gray-900">
                              {app.application_id}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-medium text-gray-900">
                              {app.full_name}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-600">{app.age}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-600">{app.country}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                                statusStyle.bg,
                                statusStyle.text
                              )}
                            >
                              {statusStyle.icon}
                              {app.status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-500">
                              {new Date(app.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Button
                              onClick={() => navigate(`/admin/applications/${app.id}`)}
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-2 ml-auto"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {!loading && applications.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <p className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ApplicationsListPage;
