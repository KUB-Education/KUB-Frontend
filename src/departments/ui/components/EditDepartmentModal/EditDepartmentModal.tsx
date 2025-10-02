import {
  Modal,
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

export type EditDepartmentModalProps = {
  open: boolean;
  department: Department;
  onClose: () => void;
};

type Inputs = Omit<EditDepartmentParams, 'id'>;

const EditDepartmentModal = ({
  open,
  onClose,
  department,
}: EditDepartmentModalProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const {
    editDepartment,
    isPending,
    error: editError,
  } = useEditDepartment({
    onSuccess: onClose,
    onError: onError,
  });

  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...department },
  });

  const onSubmit = async (values: Inputs) => {
    return editDepartment({ ...values, id: department.id });
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
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
            <BackButton onClick={onClose} />
            <SaveButton loading={isPending} disabled={!isValid} type="submit" />
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
    </Modal>
  );
};

export default EditDepartmentModal;
