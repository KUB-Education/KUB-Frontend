import {
  BackButton,
  FormTextField,
  SaveButton,
  ErrorModal,
  FieldLabel,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import {
  EditDepartmentParams,
  Department,
  departmentNameValidator,
} from '@/departments/entities';
import { useEditDepartment } from '@/departments/hooks';
import { useState } from 'react';

export type DepartmentDetailsProps = {
  department: Department;
  onBack: () => void;
  onSucceed: () => void;
};

type Inputs = Omit<EditDepartmentParams, 'id'>;

const DepartmentDetails = ({
  department,
  onBack,
  onSucceed,
}: DepartmentDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const {
    editDepartment,
    isPending,
    error: editError,
  } = useEditDepartment({ onSuccess: onSucceed, onError });

  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { ...department },
  });

  const onSubmit = async (values: Inputs) => {
    return editDepartment({ ...values, id: department.id });
  };

  const { isValid, isDirty } = formState;

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Department information</Title>
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
          <SaveButton
            loading={isPending}
            disabled={isConfirmDisabled}
            type="submit"
          />
        </Actions>
      </Form>

      <ErrorModal
        open={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        onContinue={() => setIsErrorModalVisible(false)}
      >
        {editError?.message}
      </ErrorModal>
    </Content>
  );
};

export default DepartmentDetails;
