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
  ShieldCheck,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FormData } from '@/types/form';
import AdminReviewForm from './AdminReviewForm';
import ModeratorLogin from './ModeratorLogin';

interface SubmissionRecord {
  id: string;
  applicationId: string;
  formData: FormData;
  submittedAt: string;
  status: 'pending_review' | 'approved';
  learnerName: string;
  companyName: string;
}

const ModeratorDashboard: React.FC = () => {
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
        return <Clock className="h-4 w-4 text-purple-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Pending Moderation</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Moderated</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!isLoggedIn) {
    return <ModeratorLogin onLogin={login} />;
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
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#8e44ad] text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 bg-[#7d3c98] flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Moderator</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-[#8e44ad]"
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
            icon={<ShieldCheck className="h-5 w-5" />} 
            label="Quality Check" 
            active={activeMenu === 'quality'}
            onClick={() => setActiveMenu('quality')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<AlertCircle className="h-5 w-5" />} 
            label="Pending Moderation" 
            active={activeMenu === 'pending'}
            onClick={() => setActiveMenu('pending')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<CheckCircle className="h-5 w-5" />} 
            label="Approved" 
            active={activeMenu === 'approved'}
            onClick={() => setActiveMenu('approved')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<XCircle className="h-5 w-5" />} 
            label="Rejected" 
            active={activeMenu === 'rejected'}
            onClick={() => setActiveMenu('rejected')}
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

        <div className="p-4 border-t border-[#7d3c98]">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-white hover:bg-[#7d3c98] w-full p-2 rounded transition-colors"
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
            <h2 className="text-2xl font-bold text-gray-800">Moderator Dashboard</h2>
            <p className="text-sm text-gray-500">Quality assurance and final approval</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium">Moderator Panel</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-2">{pendingCount}</h3>
                <p className="text-white/90 mb-4">Pending Moderation</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                  Review Now →
                </button>
              </div>
              <div className="absolute right-4 top-4 opacity-20">
                <AlertCircle className="h-24 w-24" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-2">{approvedCount}</h3>
                <p className="text-white/90 mb-4">Approved</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                  View Details →
                </button>
              </div>
              <div className="absolute right-4 top-4 opacity-20">
                <CheckCircle className="h-24 w-24" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-2">2</h3>
                <p className="text-white/90 mb-4">Rejected</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                  View Details →
                </button>
              </div>
              <div className="absolute right-4 top-4 opacity-20">
                <XCircle className="h-24 w-24" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-2">95%</h3>
                <p className="text-white/90 mb-4">Quality Score</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                  View Report →
                </button>
              </div>
              <div className="absolute right-4 top-4 opacity-20">
                <ShieldCheck className="h-24 w-24" />
              </div>
            </Card>
          </div>

          {/* Quality Check Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
              Quality Check Queue
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Review assessor grading for quality assurance and final approval
            </p>
            
            {submissions.filter(s => s.status === 'pending_review').length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Pending Moderations</h3>
                <p className="text-gray-500">All submissions have been moderated!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.filter(s => s.status === 'pending_review').map((submission) => (
                  <Card key={submission.id} className="p-6 hover:shadow-md transition-shadow border-l-4 border-purple-500 bg-purple-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {getStatusIcon(submission.status)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold">{submission.applicationId}</h3>
                            {getStatusBadge(submission.status)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Learner:</span> {submission.learnerName} | 
                            <span className="font-medium ml-2">Company:</span> {submission.companyName}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Assessor:</span> John Doe | 
                            <span className="font-medium ml-2">Grade:</span> <Badge className="bg-green-100 text-green-800">Pass</Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Submitted: {new Date(submission.submittedAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleViewSubmission(submission)}
                          className="flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Review</span>
                        </Button>
                        <Button
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex items-center space-x-2"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Approved Submissions Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Approved Submissions
            </h3>
            
            {submissions.filter(s => s.status === 'approved').length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Approved Submissions</h3>
                <p className="text-gray-500">Start moderating to see approved submissions here.</p>
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
                            Approved: {new Date(submission.submittedAt).toLocaleString()}
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
        active ? 'bg-[#7d3c98] border-l-4 border-white' : 'hover:bg-[#7d3c98]'
      }`}
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
    </button>
  );
};

export default ModeratorDashboard;
