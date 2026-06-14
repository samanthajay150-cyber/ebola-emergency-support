import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  ArrowLeft,
  Download,
  Printer,
  History,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";

interface Application {
  id: number;
  application_id: string;
  ready_to_proceed: boolean;
  first_time_applicant: boolean;
  heard_about_funds: string;
  other_source?: string;
  occupation: string;
  other_occupation?: string;
  full_name: string;
  age: number;
  email?: string;
  phone_number?: string;
  country: string;
  state: string;
  town: string;
  status: string;
  notes?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending Review",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: <Clock className="h-5 w-5" />,
  },
  under_review: {
    label: "Under Review",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-800 border-green-300",
    icon: <CheckCircle className="h-5 w-5" />,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: <XCircle className="h-5 w-5" />,
  },
};

const ApplicationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/applications/${id}`);
      if (response.ok) {
        const data = await response.json();
        setApplication(data.application);
        setNotes(data.application.notes || "");
      } else {
        toast.error("Application not found");
        navigate("/admin/applications");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!application) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/applications/${application.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          notes: notes,
          reviewedBy: "admin",
        }),
      });

      if (response.ok) {
        toast.success(`Application ${newStatus === "approved" ? "approved" : newStatus === "rejected" ? "rejected" : "updated"} successfully`);
        fetchApplication();
      } else {
        toast.error("Failed to update application");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application");
    } finally {
      setUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!application) return;
    
    const content = `
Application ID: ${application.application_id}
Status: ${statusConfig[application.status]?.label || application.status}

APPLICANT INFORMATION
--------------------
Name: ${application.full_name}
Age: ${application.age}
Email: ${application.email || "N/A"}
Phone: ${application.phone_number || "N/A"}

LOCATION
--------
Country: ${application.country}
State/Province: ${application.state}
Town/City: ${application.town}

APPLICATION DETAILS
-------------------
Ready to Proceed: ${application.ready_to_proceed ? "Yes" : "No"}
First Time Applicant: ${application.first_time_applicant ? "Yes" : "No"}
Heard About Funds: ${application.heard_about_funds}
${application.other_source ? `  (${application.other_source})` : ""}
Occupation: ${application.occupation}
${application.other_occupation ? `  (${application.other_occupation})` : ""}

REVIEW INFORMATION
------------------
Notes: ${application.notes || "No notes"}
Reviewed By: ${application.reviewed_by || "N/A"}
Reviewed At: ${application.reviewed_at || "N/A"}

Submitted: ${application.created_at}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `application-${application.application_id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  if (!application) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Application not found</p>
          <Button onClick={() => navigate("/admin/applications")} className="mt-4">
            Back to Applications
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const currentStatus = statusConfig[application.status] || statusConfig.pending;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/applications")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {application.application_id}
              </h1>
              <p className="text-sm text-gray-500">
                Submitted on {new Date(application.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg border",
            currentStatus.color
          )}
        >
          {currentStatus.icon}
          <span className="font-medium">{currentStatus.label}</span>
          {application.reviewed_by && (
            <span className="text-sm opacity-75">
              • Reviewed by {application.reviewed_by}
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Applicant Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-lg font-semibold text-gray-900">{application.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-lg font-semibold text-gray-900">{application.age} years old</p>
                  </div>
                  {application.email && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {application.email}
                      </p>
                    </div>
                  )}
                  {application.phone_number && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {application.phone_number}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Country</label>
                    <p className="text-gray-900">{application.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">State/Province</label>
                    <p className="text-gray-900">{application.state}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Town/City</label>
                    <p className="text-gray-900">{application.town}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600">Ready to Proceed</span>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        application.ready_to_proceed
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      )}
                    >
                      {application.ready_to_proceed ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600">First Time Applicant</span>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        application.first_time_applicant
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      {application.first_time_applicant ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="py-3 border-b">
                    <span className="text-gray-600 block mb-2">Heard About Funds From</span>
                    <span className="font-medium text-gray-900">
                      {application.heard_about_funds}
                    </span>
                    {application.other_source && (
                      <p className="text-sm text-gray-500 mt-1">
                        Additional: {application.other_source}
                      </p>
                    )}
                  </div>

                  <div className="py-3">
                    <span className="text-gray-600 block mb-2">Occupation</span>
                    <span className="font-medium text-gray-900 flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      {application.occupation}
                    </span>
                    {application.other_occupation && (
                      <p className="text-sm text-gray-500 mt-1">
                        Additional: {application.other_occupation}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Review Actions */}
          <div className="space-y-6">
            {/* Status Update Actions */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Review Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Review Notes
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter review notes, feedback, or reasoning..."
                    rows={4}
                    className="w-full"
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {application.status !== "approved" && (
                    <Button
                      onClick={() => updateStatus("approved")}
                      disabled={updating}
                      className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      Approve Application
                    </Button>
                  )}

                  {application.status !== "under_review" && application.status !== "approved" && application.status !== "rejected" && (
                    <Button
                      onClick={() => updateStatus("under_review")}
                      disabled={updating}
                      variant="outline"
                      className="w-full flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      Mark Under Review
                    </Button>
                  )}

                  {application.status !== "rejected" && (
                    <Button
                      onClick={() => updateStatus("rejected")}
                      disabled={updating}
                      variant="outline"
                      className="w-full flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-50"
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      Reject Application
                    </Button>
                  )}
                </div>

                {/* Review Info */}
                {application.reviewed_at && (
                  <div className="pt-4 mt-4 border-t">
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>
                        <span className="font-medium">Reviewed by:</span>{" "}
                        {application.reviewed_by || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Reviewed at:</span>{" "}
                        {new Date(application.reviewed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">Need Help?</p>
                    <p className="text-blue-700">
                      Review all applicant information before making a decision. 
                      Add notes to document your review process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApplicationDetailPage;
