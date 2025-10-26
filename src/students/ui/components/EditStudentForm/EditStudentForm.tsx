import {
  Actions,
  Form,
  FormControl,
  UserStatusFormControl,
} from './styles.tsx';
import {
  FieldLabel,
  FormTextField,
  ResendButton,
  SaveButton,
} from '@/common/ui/components';
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useMemo } from 'react';
import {
  getUserStatusLabel,
  isUserEmailSendingFailure,
} from '@/users/entities';
import { useForm } from 'react-hook-form';
import { EditStudentParams, Student } from '@/students/entities';

export type EditStudentFormProps = {
  student: Student;
  isPending: boolean;
  className?: string;
  onResend: () => void;
  onEdit: (params: EditStudentParams) => void;
};

type Inputs = Pick<
  EditStudentParams,
  'email' | 'firstName' | 'lastName' | 'middleName'
>;

const EditStudentForm = ({
  student,
  isPending,
  className,
  onResend,
  onEdit,
}: EditStudentFormProps) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...student },
  });

  const userStatusValue = useMemo(() => {
    return student && getUserStatusLabel(student.status);
  }, [student]);

  const isResendAvailable = useMemo(() => {
    return isUserEmailSendingFailure(student);
  }, [student]);

  const onSubmit = async (values: Inputs) => {
    return onEdit({ ...values, id: student.id });
  };

  const { isValid } = formState;

  const isSubmitDisabled = isPending || !isValid;

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)}>
      <UserStatusFormControl>
        <FieldLabel shrink htmlFor="userStatus">
          User Status
        </FieldLabel>
        <FormTextField label="userStatus" readOnly value={userStatusValue} />
      </UserStatusFormControl>
      <FormControl>
        <FieldLabel shrink htmlFor="lastName">
          Last Name
        </FieldLabel>
        <FormTextField
          label="Last Name"
          {...register('lastName', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <FieldLabel shrink htmlFor="firstName">
          First Name
        </FieldLabel>
        <FormTextField
          label="First Name"
          {...register('firstName', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <FieldLabel shrink htmlFor="middleName">
          Middle Name
        </FieldLabel>
        <FormTextField
          label="Middle Name"
          {...register('middleName', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <FieldLabel shrink htmlFor="email">
          Email
        </FieldLabel>
        <FormTextField
          label="Email"
          {...register('email', {
            ...requiredValidator(),
            ...emailValidator(),
          })}
        />
      </FormControl>
      <Actions>
        {isResendAvailable && (
          <ResendButton disabled={isPending} onClick={onResend} />
        )}
        <SaveButton disabled={isSubmitDisabled} type="submit" />
      </Actions>
    </Form>
  );
};

export default EditStudentForm;
