import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import {
  getUserStatusLabel,
  isUserEmailSendingFailure,
} from '@/users/entities';
import { Actions, Form, FormControl, UserStatusFormControl } from './styles';
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
import { EditLecturerParams, Lecturer } from '@/lecturers/entities';

export type EditLecturerFormProps = {
  lecturer: Lecturer;
  isPending: boolean;
  className?: string;
  onResend: () => void;
  onEdit: (params: EditLecturerParams) => void;
};

type Inputs = Pick<
  EditLecturerParams,
  'email' | 'firstName' | 'lastName' | 'middleName'
>;

const EditLecturerForm = ({
  lecturer,
  isPending,
  className,
  onEdit,
  onResend,
}: EditLecturerFormProps) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...lecturer },
  });

  const userStatusValue = useMemo(() => {
    return lecturer && getUserStatusLabel(lecturer.userStatus);
  }, [lecturer]);

  const isResendAvailable = useMemo(() => {
    return isUserEmailSendingFailure(lecturer);
  }, [lecturer]);

  const onSubmit = async (values: Inputs) => {
    return onEdit({ ...values, id: lecturer.id });
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

export default EditLecturerForm;
