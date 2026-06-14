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
  Loader2,
  ArrowLeft,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

interface Application {
  application_id: string;
  full_name: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  submission_date: string;
  country: string;
  email?: string;
  phone_number?: string;
}

const DashboardPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/applications");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "approved":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle className="h-3 w-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <XCircle className="h-3 w-3" />
            Rejected
          </span>
        );
      case "under_review":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <Clock className="h-3 w-3" />
            Under Review
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-orange-100 text-orange-800`}>
            <AlertCircle className="h-3 w-3" />
            Pending
          </span>
        );
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.application_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Application Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track the status of your Ebola Emergency Support applications
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by Application ID or Name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error */}
          {error && (
            <Alert variant="error" title="Error" description={error} className="mb-6" />
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* Applications List */}
          {!loading && !error && (
            <>
              {filteredApplications.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="text-gray-400 mb-4">
                      <AlertCircle className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Applications Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {applications.length === 0
                        ? "You haven't submitted any applications yet."
                        : "No applications match your search criteria."}
                    </p>
                    {applications.length === 0 && (
                      <Link to="/apply">
                        <Button>Start New Application</Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((app) => (
                    <Card key={app.application_id} variant="bordered">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Application Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                {app.application_id}
                              </span>
                              {getStatusBadge(app.status)}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {app.full_name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span>📍 {app.country}</span>
                              <span>📅 Submitted: {formatDate(app.submission_date)}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            {app.status === "approved" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Stats Summary */}
          {applications.length > 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {applications.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {applications.filter((a) => a.status === "pending").length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {applications.filter((a) => a.status === "approved").length}
                  </div>
                  <div className="text-sm text-gray-600">Approved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {applications.filter((a) => a.status === "rejected").length}
                  </div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
