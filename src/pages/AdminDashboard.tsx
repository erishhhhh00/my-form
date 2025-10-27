import { FormProvider } from '@/context/FormContext';
import { AuthProvider } from '@/context/AuthContext';
import { SubmissionProvider } from '@/context/SubmissionContext';
import AdminDashboard from '@/components/AdminDashboard';

const AdminDashboardPage = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <SubmissionProvider>
          <AdminDashboard />
        </SubmissionProvider>
      </FormProvider>
    </AuthProvider>
  );
};

export default AdminDashboardPage;