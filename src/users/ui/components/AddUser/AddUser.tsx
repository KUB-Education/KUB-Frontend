import {
  AddButton,
  BackButton,
  FormTextField,
  ErrorModal,
  FieldLabel,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAddUser } from '@/users/hooks';
import { AddUserParams } from '@/users/entities';
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';

export type AddUserProps = {
  onBack: () => void;
  onSucceed: () => void;
};

const AddUser = ({ onBack, onSucceed }: AddUserProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<AddUserParams>({
    mode: 'onChange',
  });
  const { addUser, isPending, error } = useAddUser({
    onSuccess: onSucceed,
    onError,
  });

  const onSubmit = async (values: AddUserParams) => {
    return addUser(values);
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new user</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <BackButton onClick={onBack} />
          <AddButton loading={isPending} disabled={!isValid} type="submit" />
        </Actions>
      </Form>

      <ErrorModal
        open={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        onContinue={() => setIsErrorModalVisible(false)}
      >
        {error?.message}
      </ErrorModal>
    </Content>
  );
};

export default AddUser;
