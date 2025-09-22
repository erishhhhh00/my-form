import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-500 text-white px-4 py-2 text-xl font-bold mr-3 shadow-lg h-16 flex items-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', transform: 'perspective(500px) rotateX(10deg)' }}>SSIPL</div>
            <div className="text-5xl font-bold" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)', transform: 'perspective(500px) rotateX(5deg)' }}>Shield Skills Institute</div>
          </div>
          <div className="text-lg text-muted-foreground">Training Academy LLP</div>
          <h1 className="text-3xl font-bold mt-4">Fall Arrest & Rescue Management</h1>
          <p className="text-xl text-muted-foreground">Assessment Form System</p>
        </div>

        {/* Access Cards */}
        <div className="flex justify-center max-w-2xl mx-auto">
          {/* User Access */}
          <Card className="p-8 hover:shadow-lg transition-shadow border-2 w-full max-w-md">
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