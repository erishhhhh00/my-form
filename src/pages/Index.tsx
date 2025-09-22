import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCog, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-500 text-white px-4 py-2 text-lg font-bold mr-3">SSIPL</div>
            <div className="text-4xl font-bold">Shield Skills Institute</div>
          </div>
          <div className="text-lg text-muted-foreground">Training Academy LLP</div>
          <h1 className="text-3xl font-bold mt-4">Fall Arrest & Rescue Management</h1>
          <p className="text-xl text-muted-foreground">Assessment Form System</p>
        </div>

        {/* Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* User Access */}
          <Card className="p-8 hover:shadow-lg transition-shadow border-2">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Users className="h-16 w-16 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">User Access</h2>
              <p className="text-muted-foreground">
                Complete your FARM assessment form. Fill out all 17 pages and submit for admin review.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link to="/user">
                  <FileText className="h-5 w-5 mr-2" />
                  Start Assessment Form
                </Link>
              </Button>
            </div>
          </Card>

          {/* Admin Access */}
          <Card className="p-8 hover:shadow-lg transition-shadow border-2">
            <div className="space-y-4">
              <div className="flex justify-center">
                <UserCog className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Admin Access</h2>
              <p className="text-muted-foreground">
                Review submitted forms, edit admin fields, and finalize submissions with PDF generation.
              </p>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/admin">
                  <Shield className="h-5 w-5 mr-2" />
                  Admin Dashboard
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="text-lg font-bold">FALL ARREST & RESCUE MANAGEMENT - ToClf</div>
          <div className="text-sm text-muted-foreground mt-2">Version 1.0</div>
        </div>
      </div>
    </div>
  );
};

export default Index;

