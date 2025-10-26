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
  EditUserParams,
  getUserStatusLabel,
  isUserEmailSendingFailure,
  User,
} from '@/users/entities';
import { useForm } from 'react-hook-form';
import { getFormDirtyValues } from '@/common/utils';

export type EditUserFormProps = {
  user: User;
  isPending: boolean;
  className?: string;
  onResend: () => void;
  onEdit: (data: EditUserParams) => void;
};

type Inputs = {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
};

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
  const { isValid, isDirty, dirtyFields } = formState;

  const userStatusValue = useMemo(() => {
    return user && getUserStatusLabel(user.status);
  }, [user]);

  const isResendAvailable = useMemo(() => {
    return isUserEmailSendingFailure(user);
  }, [user]);

  const onSubmit = async (values: Inputs) => {
    const updatedValues = getFormDirtyValues(values, dirtyFields);

    return onEdit({ ...updatedValues, id: user.id });
  };

  const isSubmitDisabled = isPending || !isValid || !isDirty;

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
        <FormTextField label="Middle Name" {...register('middleName')} />
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

export default EditUserForm;
