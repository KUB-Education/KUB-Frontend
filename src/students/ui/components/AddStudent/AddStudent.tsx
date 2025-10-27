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
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useAddStudent } from '@/students/hooks';
import { AddStudentParams } from '@/students/entities';

export type AddStudentProps = {
  onSuccess?: () => void;
  onBack?: () => void;
};

const AddStudent = ({ onSuccess, onBack }: AddStudentProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<AddStudentParams>({
    mode: 'onChange',
  });
  const { addStudent, isPending, error } = useAddStudent({
    onSuccess,
    onError,
  });

  const onSubmit = async (values: AddStudentParams) => {
    return addStudent(values);
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new student</Title>
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

export default AddStudent;
