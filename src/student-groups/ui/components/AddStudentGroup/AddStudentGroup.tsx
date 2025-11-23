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
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useAddStudentGroup } from '@/student-groups/hooks/useAddStudentGroup.ts';
import { AddStudentGroupParams } from '@/student-groups/entities/AddStudentGroupParams.ts';

export type AddStudentGroupProps = {
  onSuccess?: () => void;
  onBack?: () => void;
};

const AddStudentGroup = ({ onSuccess, onBack }: AddStudentGroupProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<AddStudentGroupParams>({
    mode: 'onChange',
  });
  const { addStudentGroup, isPending, error } = useAddStudentGroup({
    onSuccess,
    onError,
  });

  const onSubmit = async (values: AddStudentGroupParams) => {
    return addStudentGroup(values);
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new student group</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="name">
            Name
          </FieldLabel>
          <FormTextField
            label="Name"
            {...register('name', { ...requiredValidator() })}
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

export default AddStudentGroup;
