import {
  AddButton,
  BackButton,
  FormTextField,
  ErrorModal,
  FieldLabel,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import {
  AddDepartmentParams,
  departmentNameValidator,
} from '@/departments/entities';
import { useAddDepartment } from '@/departments/hooks';
import { useState } from 'react';

export type AddDepartmentProps = {
  onBack: () => void;
  onSucceed: () => void;
};

const AddDepartment = ({ onBack, onSucceed }: AddDepartmentProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { addDepartment, isPending, error } = useAddDepartment({
    onSuccess: onSucceed,
    onError,
  });
  const { register, handleSubmit, formState } = useForm<AddDepartmentParams>({
    mode: 'onChange',
  });

  const onSubmit = async (values: AddDepartmentParams) => {
    return addDepartment(values);
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new department</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="name">
            Name
          </FieldLabel>
          <FormTextField
            label="name"
            {...register('name', { ...departmentNameValidator })}
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

export default AddDepartment;
