import {
  Actions,
  Form,
  FormControl,
  UserStatusFormControl,
} from './styles.tsx';
import { InputLabel } from '@mui/material';
import {
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
  EditUserParams,
  getUserStatusLabel,
  isUserEmailSendingFailure,
  User,
} from '@/users/entities';
import { useForm } from 'react-hook-form';

export type EditUserFormProps = {
  user: User;
  isPending: boolean;
  className?: string;
  onResend: () => void;
  onEdit: (params: EditUserParams) => void;
};

type Inputs = Omit<EditUserParams, 'id'>;

const EditUserForm = ({
  user,
  isPending,
  className,
  onResend,
  onEdit,
}: EditUserFormProps) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...user },
  });

  const userStatusValue = useMemo(() => {
    return user && getUserStatusLabel(user.userStatus);
  }, [user]);

  const isResendAvailable = useMemo(() => {
    return isUserEmailSendingFailure(user);
  }, [user]);

  const onSubmit = async (values: Inputs) => {
    return onEdit({ ...values, id: user.id });
  };

  const { isValid } = formState;

  const isSubmitDisabled = isPending || !isValid;

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)}>
      <UserStatusFormControl>
        <InputLabel shrink htmlFor="userStatus">
          User Status
        </InputLabel>
        <FormTextField label="userStatus" readOnly value={userStatusValue} />
      </UserStatusFormControl>
      <FormControl>
        <InputLabel shrink htmlFor="lastName">
          Last Name
        </InputLabel>
        <FormTextField
          label="Last Name"
          {...register('lastName', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="firstName">
          First Name
        </InputLabel>
        <FormTextField
          label="First Name"
          {...register('firstName', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="middleName">
          Middle Name
        </InputLabel>
        <FormTextField
          label="Middle Name"
          {...register('middleName', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="email">
          Email
        </InputLabel>
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

export default EditUserForm;
