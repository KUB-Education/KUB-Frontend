import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
  DeleteButton,
} from '@/common/ui/components';
import {
  Content,
  Title,
  Actions,
  Form,
  FormControl,
  ButtonsGroup,
} from './styles.tsx';
import { useForm } from 'react-hook-form';
import { EditDepartmentParams,
  Department,
  departmentNameValidator
} from '@/departments/entities';
import { InputLabel } from '@mui/material';
import { useEditDepartment, useDeleteDepartment } from '@/departments/hooks';

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
  const { editDepartment, isPending } = useEditDepartment({
    onSuccess: onClose,
  });

  const { deleteDepartments } = useDeleteDepartment({
    onSuccess: onClose,
  });

  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...department },
  });

  const onSubmit = async (values: Inputs) => {
    return editDepartment({ ...values, id: department.id });
  };

  const handleDelete = () => {
    deleteDepartments([department.id]);
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Department information</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <InputLabel shrink htmlFor="name">
              Name
            </InputLabel>
            <FormTextField
              label="name"
              {...register('name', { ...departmentNameValidator })}
            />
          </FormControl>
          <Actions>
            <BackButton onClick={onClose} />
            <ButtonsGroup>
              <SaveButton loading={isPending} disabled={!isValid} type="submit" />
              <DeleteButton onClick={handleDelete} />
            </ButtonsGroup>
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default EditDepartmentModal;
