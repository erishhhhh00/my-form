import { FormProvider } from '@/context/FormContext';
import { SubmissionProvider } from '@/context/SubmissionContext';
import FormContainer from '@/components/FormContainer';

const UserForm = () => {
  return (
    <FormProvider>
      <SubmissionProvider>
        <FormContainer userMode={true} />
      </SubmissionProvider>
    </FormProvider>
  );
};

export default UserForm;