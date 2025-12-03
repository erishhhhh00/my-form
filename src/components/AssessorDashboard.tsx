import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  FileText, 
  Clock, 
  CheckCircle, 
  LogOut, 
  LayoutDashboard,
  BarChart3,
  Settings,
  Menu,
  User,
  ClipboardCheck,
  FileCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FormData } from '@/types/form';
import AdminReviewForm from './AdminReviewForm';
import AssessorLogin from './AssessorLogin';

interface SubmissionRecord {
  id: string;
  applicationId: string;
  formData: FormData;
  submittedAt: string;
  status: 'pending_review' | 'approved';
  learnerName: string;
  companyName: string;
}

const AssessorDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const { isLoggedIn, login, logout } = useAuth();

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

  if (!isLoggedIn) {
    return <AssessorLogin onLogin={login} />;
  }

  if (selectedSubmission) {
    return (
      <AdminReviewForm 
        submission={selectedSubmission}
        onBack={handleBackToDashboard}
      />
    );
  }

  const pendingCount = submissions.filter(s => s.status === 'pending_review').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#16a085] text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 bg-[#138f7a] flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Assessor</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-[#16a085]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 py-4">
          <MenuItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Dashboard" 
            active={activeMenu === 'dashboard'}
            onClick={() => setActiveMenu('dashboard')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<ClipboardCheck className="h-5 w-5" />} 
            label="Pending Reviews" 
            active={activeMenu === 'pending'}
            onClick={() => setActiveMenu('pending')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<FileCheck className="h-5 w-5" />} 
            label="Completed" 
            active={activeMenu === 'completed'}
            onClick={() => setActiveMenu('completed')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<BarChart3 className="h-5 w-5" />} 
            label="My Reports" 
            active={activeMenu === 'reports'}
            onClick={() => setActiveMenu('reports')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            active={activeMenu === 'settings'}
            onClick={() => setActiveMenu('settings')}
            collapsed={!sidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-[#138f7a]">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-white hover:bg-[#138f7a] w-full p-2 rounded transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Assessor Dashboard</h2>
            <p className="text-sm text-gray-500">Review and grade trainer submissions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium">Assessor Panel</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-2">{pendingCount}</h3>
                <p className="text-white/90 mb-4">Pending Reviews</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                  Review Now →
                </button>
              </div>
              <div className="absolute right-4 top-4 opacity-20">
                <Clock className="h-24 w-24" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-2">{approvedCount}</h3>
                <p className="text-white/90 mb-4">Approved Today</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                  View Details →
                </button>
              </div>
              <div className="absolute right-4 top-4 opacity-20">
                <CheckCircle className="h-24 w-24" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-2">{submissions.length}</h3>
                <p className="text-white/90 mb-4">Total Submissions</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                  View All →
                </button>
              </div>
              <div className="absolute right-4 top-4 opacity-20">
                <FileText className="h-24 w-24" />
              </div>
            </Card>
          </div>

          {/* Pending Reviews Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ClipboardCheck className="h-6 w-6 text-orange-600" />
              Pending Reviews
            </h3>
            
            {submissions.filter(s => s.status === 'pending_review').length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Pending Reviews</h3>
                <p className="text-gray-500">All submissions have been reviewed!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.filter(s => s.status === 'pending_review').map((submission) => (
                  <Card key={submission.id} className="p-6 hover:shadow-md transition-shadow border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(submission.status)}
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold">{submission.applicationId}</h3>
                            {getStatusBadge(submission.status)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Learner:</span> {submission.learnerName} | 
                            <span className="font-medium ml-2">Company:</span> {submission.companyName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Submitted: {new Date(submission.submittedAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleViewSubmission(submission)}
                        className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Review & Grade</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Completed Reviews Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-green-600" />
              Completed Reviews
            </h3>
            
            {submissions.filter(s => s.status === 'approved').length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Completed Reviews</h3>
                <p className="text-gray-500">Start reviewing submissions to see them here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.filter(s => s.status === 'approved').map((submission) => (
                  <Card key={submission.id} className="p-6 hover:shadow-md transition-shadow border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(submission.status)}
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold">{submission.applicationId}</h3>
                            {getStatusBadge(submission.status)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Learner:</span> {submission.learnerName} | 
                            <span className="font-medium ml-2">Company:</span> {submission.companyName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Submitted: {new Date(submission.submittedAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => handleViewSubmission(submission)}
                        className="flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, active, onClick, collapsed }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 transition-colors ${
        active ? 'bg-[#138f7a] border-l-4 border-white' : 'hover:bg-[#138f7a]'
      }`}
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
    </button>
  );
};

export default AssessorDashboard;
