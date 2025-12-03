import { FormProvider } from '@/context/FormContext';
import { AuthProvider } from '@/context/AuthContext';
import { SubmissionProvider } from '@/context/SubmissionContext';
import AssessorDashboard from '@/components/AssessorDashboard';

const AssessorDashboardPage = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <SubmissionProvider>
          <AssessorDashboard />
        </SubmissionProvider>
      </FormProvider>
    </AuthProvider>
  );
};

export default AssessorDashboardPage;
