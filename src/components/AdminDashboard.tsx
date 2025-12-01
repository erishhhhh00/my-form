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
  Users, 
  LayoutDashboard,
  UserCircle,
  UsersRound,
  Store,
  Table2,
  FolderTree,
  Package,
  ShoppingCart,
  BarChart3,
  Building2,
  User,
  Settings,
  Menu,
  ChevronRight
} from 'lucide-react';
import { useSubmission } from '@/context/SubmissionContext';
import { useAuth } from '@/context/AuthContext';
import { FormData } from '@/types/form';
import AdminReviewForm from './AdminReviewForm';
import AdminLogin from './AdminLogin';
import AttendanceSheet from './AttendanceSheet';

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
  const [showAttendance, setShowAttendance] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeView, setActiveView] = useState<'overview' | 'trainings' | 'trainer' | 'assessor' | 'moderator' | 'finance'>('overview');
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
    setShowAttendance(false);
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

  // Show attendance sheet if requested
  if (showAttendance) {
    return (
      <div>
        <div className="p-4 bg-white border-b">
          <Button 
            variant="outline" 
            onClick={handleBackToDashboard}
            className="mb-2"
          >
            ← Back to Dashboard
          </Button>
        </div>
        <AttendanceSheet />
      </div>
    );
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#2c3e50] text-white transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 bg-[#34495e] flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Admin</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-[#2c3e50]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4">
          <MenuItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Dashboard" 
            active={activeMenu === 'dashboard'}
            onClick={() => { setActiveMenu('dashboard'); setActiveView('overview'); }}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<FileText className="h-5 w-5" />} 
            label="Training Management" 
            active={activeMenu === 'trainings'}
            onClick={() => { setActiveMenu('trainings'); setActiveView('trainings'); }}
            collapsed={!sidebarOpen}
            hasSubmenu
          />
          <MenuItem 
            icon={<UserCircle className="h-5 w-5" />} 
            label="Trainer View" 
            active={activeMenu === 'trainer'}
            onClick={() => { setActiveMenu('trainer'); setActiveView('trainer'); }}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<BarChart3 className="h-5 w-5" />} 
            label="Assessor View" 
            active={activeMenu === 'assessor'}
            onClick={() => { setActiveMenu('assessor'); setActiveView('assessor'); }}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<CheckCircle className="h-5 w-5" />} 
            label="Moderator View" 
            active={activeMenu === 'moderator'}
            onClick={() => { setActiveMenu('moderator'); setActiveView('moderator'); }}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<ShoppingCart className="h-5 w-5" />} 
            label="Finance & Certificates" 
            active={activeMenu === 'finance'}
            onClick={() => { setActiveMenu('finance'); setActiveView('finance'); }}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<Users className="h-5 w-5" />} 
            label="Attendance Sheet" 
            active={activeMenu === 'attendance'}
            onClick={() => { setActiveMenu('attendance'); setShowAttendance(true); }}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<Building2 className="h-5 w-5" />} 
            label="Client Management" 
            active={activeMenu === 'clients'}
            onClick={() => setActiveMenu('clients')}
            collapsed={!sidebarOpen}
          />
          <MenuItem 
            icon={<BarChart3 className="h-5 w-5" />} 
            label="Reports & Analytics" 
            active={activeMenu === 'reports'}
            onClick={() => setActiveMenu('reports')}
            collapsed={!sidebarOpen}
            hasSubmenu
          />
          <MenuItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            active={activeMenu === 'setting'}
            onClick={() => setActiveMenu('setting')}
            collapsed={!sidebarOpen}
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#34495e]">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-white hover:bg-[#34495e] w-full p-2 rounded transition-colors"
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
            <h2 className="text-2xl font-bold text-gray-800">
              {activeView === 'overview' && 'Training Dashboard'}
              {activeView === 'trainings' && 'Training Management'}
              {activeView === 'trainer' && 'Trainer View'}
              {activeView === 'assessor' && 'Assessor View'}
              {activeView === 'moderator' && 'Moderator View'}
              {activeView === 'finance' && 'Finance & Certificates'}
            </h2>
            <p className="text-sm text-gray-500">
              {activeView === 'overview' && 'Overview & Statistics'}
              {activeView === 'trainings' && 'Assign and Track Trainings'}
              {activeView === 'trainer' && 'My Assignments & Submissions'}
              {activeView === 'assessor' && 'Pending Reviews & Grading'}
              {activeView === 'moderator' && 'Quality Check & Approval'}
              {activeView === 'finance' && 'Payment & Certificate Management'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Home</span>
            <span>›</span>
            <span className="text-gray-900 font-medium">
              {activeView === 'overview' && 'Dashboard'}
              {activeView === 'trainings' && 'Training Management'}
              {activeView === 'trainer' && 'Trainer'}
              {activeView === 'assessor' && 'Assessor'}
              {activeView === 'moderator' && 'Moderator'}
              {activeView === 'finance' && 'Finance'}
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeView === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Active Trainings */}
                <Card className="bg-gradient-to-br from-cyan-400 to-cyan-500 text-white p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-5xl font-bold mb-2">12</h3>
                    <p className="text-white/90 mb-4">Active Trainings</p>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                      More info ⊕
                    </button>
                  </div>
                  <div className="absolute right-4 top-4 opacity-20">
                    <FileText className="h-24 w-24" />
                  </div>
                </Card>

                {/* Pending Reviews */}
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-5xl font-bold mb-2">8</h3>
                    <p className="text-white/90 mb-4">Pending Reviews</p>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                      More info ⊕
                    </button>
                  </div>
                  <div className="absolute right-4 top-4 opacity-20">
                    <Clock className="h-24 w-24" />
                  </div>
                </Card>

                {/* Trainer Submissions */}
                <Card className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-5xl font-bold mb-2">15</h3>
                    <p className="text-white/90 mb-4">Trainer Submissions</p>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                      More info ⊕
                    </button>
                  </div>
                  <div className="absolute right-4 top-4 opacity-20">
                    <Package className="h-24 w-24" />
                  </div>
                </Card>

                {/* Payments Pending */}
                <Card className="bg-gradient-to-br from-red-400 to-red-500 text-white p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-5xl font-bold mb-2">5</h3>
                    <p className="text-white/90 mb-4">Payments Pending</p>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
                      More info ⊕
                    </button>
                  </div>
                  <div className="absolute right-4 top-4 opacity-20">
                    <ShoppingCart className="h-24 w-24" />
                  </div>
                </Card>
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-6">
                  <h3 className="text-4xl font-bold mb-2">25</h3>
                  <p className="text-white/90">Certificates to Issue</p>
                </Card>
                <Card className="bg-gradient-to-br from-indigo-400 to-indigo-500 text-white p-6">
                  <h3 className="text-4xl font-bold mb-2">6</h3>
                  <p className="text-white/90">Upcoming Sessions</p>
                </Card>
                <Card className="bg-gradient-to-br from-pink-400 to-pink-500 text-white p-6">
                  <h3 className="text-4xl font-bold mb-2">92%</h3>
                  <p className="text-white/90">Pass Rate</p>
                </Card>
              </div>

              {/* Stats & KPIs Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">📊 Stats / KPIs</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Trainings Completed</span>
                      <span className="font-bold text-xl">147</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pass/Fail Rate</span>
                      <span className="font-bold text-xl text-green-600">92% / 8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Trainer Performance</span>
                      <span className="font-bold text-xl">4.5/5.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Document Pending Count</span>
                      <span className="font-bold text-xl text-orange-600">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Client Payment Status</span>
                      <span className="font-bold text-xl text-red-600">5 Unpaid</span>
                    </div>
                  </div>
                </Card>

                {/* Notifications */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">🔔 Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Trainer submitted documents</p>
                        <p className="text-xs text-gray-600">John Doe - FARM Training - 2 mins ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-orange-600 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Moderator approval needed</p>
                        <p className="text-xs text-gray-600">Assessment ID: #12345 - 15 mins ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Payment received</p>
                        <p className="text-xs text-gray-600">Client: ABC Corp - ₹25,000 - 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Certificate issued</p>
                        <p className="text-xs text-gray-600">Training ID: #TRN-2024-089 - 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {/* Training Management View */}
          {activeView === 'trainings' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Assign New Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Trainer</label>
                    <select className="w-full border rounded px-3 py-2">
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                      <option>Mike Johnson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Client</label>
                    <select className="w-full border rounded px-3 py-2">
                      <option>ABC Corporation</option>
                      <option>XYZ Industries</option>
                      <option>Tech Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Training Type</label>
                    <select className="w-full border rounded px-3 py-2">
                      <option>FARM Training</option>
                      <option>Safety Training</option>
                      <option>Equipment Training</option>
                    </select>
                  </div>
                </div>
                <Button className="mt-4">Assign Training</Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Training Status Tracker</h3>
                <div className="space-y-3">
                  {[
                    { id: 'TRN-001', trainer: 'John Doe', client: 'ABC Corp', status: 'Assigned', color: 'blue' },
                    { id: 'TRN-002', trainer: 'Jane Smith', client: 'XYZ Ltd', status: 'In Progress', color: 'yellow' },
                    { id: 'TRN-003', trainer: 'Mike Johnson', client: 'Tech Inc', status: 'Submitted', color: 'purple' },
                    { id: 'TRN-004', trainer: 'Sarah Wilson', client: 'Edu Corp', status: 'Assessed', color: 'orange' },
                    { id: 'TRN-005', trainer: 'Tom Brown', client: 'Build Co', status: 'Moderated', color: 'green' },
                  ].map((training) => (
                    <div key={training.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="font-bold">{training.id}</span>
                        <span className="text-gray-600">{training.trainer}</span>
                        <span className="text-gray-600">→ {training.client}</span>
                      </div>
                      <Badge className={`bg-${training.color}-100 text-${training.color}-800`}>
                        {training.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Trainer View */}
          {activeView === 'trainer' && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">My Assignments</h3>
              <p className="text-gray-600 mb-4">Upload required documents and Proof of Evidence (POE)</p>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">Training #{i} - FARM Training</h4>
                        <p className="text-sm text-gray-600">Client: ABC Corporation</p>
                        <p className="text-xs text-gray-500">Assigned: Dec 1, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Upload Q&A</Button>
                        <Button size="sm" variant="outline">Upload POE</Button>
                        <Button size="sm">Submit</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Assessor View */}
          {activeView === 'assessor' && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Pending Review</h3>
              <p className="text-gray-600 mb-4">Review and grade trainer submissions</p>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">Submission #{i}</h4>
                        <p className="text-sm text-gray-600">Trainer: John Doe | Client: XYZ Ltd</p>
                        <p className="text-xs text-gray-500">Submitted: Dec {i}, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Documents</Button>
                        <Button size="sm">Grade & Approve</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Moderator View */}
          {activeView === 'moderator' && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Quality Check</h3>
              <p className="text-gray-600 mb-4">Verify assessor grading for quality assurance</p>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="border rounded-lg p-4 bg-orange-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">Assessment #{i}</h4>
                        <p className="text-sm text-gray-600">Assessor: Sarah Wilson | Grade: Pass</p>
                        <p className="text-xs text-gray-500">Assessed: Dec {i}, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Review Details</Button>
                        <Button size="sm" className="bg-green-600">Approve</Button>
                        <Button size="sm" variant="destructive">Reject</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Finance & Certificates View */}
          {activeView === 'finance' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Payment Tracking</h3>
                <div className="space-y-3">
                  {[
                    { client: 'ABC Corp', amount: '₹25,000', status: 'Paid', date: 'Nov 28, 2024' },
                    { client: 'XYZ Ltd', amount: '₹30,000', status: 'Unpaid', date: 'Nov 25, 2024' },
                    { client: 'Tech Inc', amount: '₹20,000', status: 'Paid', date: 'Nov 20, 2024' },
                  ].map((payment, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-bold">{payment.client}</h4>
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">{payment.amount}</span>
                        <Badge className={payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {payment.status}
                        </Badge>
                        {payment.status === 'Unpaid' && (
                          <Button size="sm">Mark as Paid</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Certificate Generation</h3>
                <p className="text-sm text-gray-600 mb-4">Certificates can only be issued after Moderation AND Payment confirmation</p>
                <div className="space-y-3">
                  {[
                    { id: 'TRN-001', learner: 'John Doe', moderated: true, paid: true },
                    { id: 'TRN-002', learner: 'Jane Smith', moderated: true, paid: false },
                    { id: 'TRN-003', learner: 'Mike Johnson', moderated: false, paid: true },
                  ].map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-bold">{cert.id} - {cert.learner}</h4>
                        <div className="flex gap-3 mt-1">
                          <span className={`text-xs ${cert.moderated ? 'text-green-600' : 'text-red-600'}`}>
                            {cert.moderated ? '✓ Moderated' : '✗ Not Moderated'}
                          </span>
                          <span className={`text-xs ${cert.paid ? 'text-green-600' : 'text-red-600'}`}>
                            {cert.paid ? '✓ Paid' : '✗ Unpaid'}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!cert.moderated || !cert.paid}
                        className={!cert.moderated || !cert.paid ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        Generate Certificate
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Form Submissions Section (Default Dashboard) */}
          {activeView === 'overview' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Form Submissions</h3>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Submissions Yet</h3>
                  <p className="text-gray-500">
                    Form submissions will appear here when users submit their applications.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="p-6 hover:shadow-md transition-shadow border border-gray-200">
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
          )}
        </div>
      </div>
    </div>
  );
};

// MenuItem Component
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
  hasSubmenu?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, active, onClick, collapsed, hasSubmenu }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-3 transition-colors ${
        active ? 'bg-[#1a252f] border-l-4 border-white' : 'hover:bg-[#34495e]'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
      {!collapsed && hasSubmenu && <ChevronRight className="h-4 w-4" />}
    </button>
  );
};

export default AdminDashboard;