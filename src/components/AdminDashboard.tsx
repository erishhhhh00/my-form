import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, Clock, CheckCircle, LogOut } from 'lucide-react';
import { useSubmission } from '@/context/SubmissionContext';
import { useAuth } from '@/context/AuthContext';
import { FormData } from '@/types/form';
import AdminReviewForm from './AdminReviewForm';
import AdminLogin from './AdminLogin';

interface SubmissionRecord {
  id: string;
  applicationId: string;
  formData: FormData;
  submittedAt: string;
  status: 'pending_review' | 'approved';
  learnerName: string;
  companyName: string;
}

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);
  const { isLoggedIn, login, logout } = useAuth();

  // Load submissions from localStorage on component mount
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('formSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const handleViewSubmission = (submission: SubmissionRecord) => {
    setSelectedSubmission(submission);
  };

  const handleBackToDashboard = () => {
    setSelectedSubmission(null);
    // Reload submissions to reflect any status changes
    const savedSubmissions = localStorage.getItem('formSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Show login form if not logged in
  if (!isLoggedIn) {
    return <AdminLogin onLogin={login} />;
  }

  if (selectedSubmission) {
    return (
      <AdminReviewForm 
        submission={selectedSubmission}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Admin Banner */}
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-lg font-bold text-red-800">🔴 You are viewing this as Admin</h3>
                <p className="text-sm text-red-600">You have full access to review and edit form submissions</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Review and manage form submissions</p>
        </div>

        {submissions.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Submissions Yet</h3>
            <p className="text-muted-foreground">
              Form submissions will appear here when users submit their applications.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(submission.status)}
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">{submission.applicationId}</h3>
                        {getStatusBadge(submission.status)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Learner:</span> {submission.learnerName} | 
                        <span className="font-medium ml-2">Company:</span> {submission.companyName}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Submitted: {new Date(submission.submittedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSubmission(submission)}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Review</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;