import { FormProvider } from '@/context/FormContext';
import { AuthProvider } from '@/context/AuthContext';
import { SubmissionProvider } from '@/context/SubmissionContext';
import ModeratorDashboard from '@/components/ModeratorDashboard';

const ModeratorDashboardPage = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <SubmissionProvider>
          <ModeratorDashboard />
        </SubmissionProvider>
      </FormProvider>
    </AuthProvider>
  );
};

export default ModeratorDashboardPage;
