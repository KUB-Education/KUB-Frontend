import {
  Modal,
  AddButton,
  BackButton,
  FormTextField,
  ErrorModal,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { useState } from 'react';
import { useAddUser } from '@/users/hooks';
import { AddUserParams } from '@/users/entities';
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';

export type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddUserModal = ({ open, onClose }: AddUserModalProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<AddUserParams>({
    mode: 'onChange',
  });
  const { addUser, isPending, error } = useAddUser({
    onSuccess: onClose,
    onError,
  });

  const onSubmit = async (values: AddUserParams) => {
    return addUser(values);
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Add new user</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            <InputLabel shrink htmlFor="middleName">
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
            <BackButton onClick={onClose} />
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
    </Modal>
  );
};

export default AddUserModal;
