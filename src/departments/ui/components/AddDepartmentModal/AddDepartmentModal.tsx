import {
  Modal,
  AddButton,
  BackButton,
  FormTextField,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { AddDepartmentParams,
  departmentNameValidator,
} from '@/departments/entities';
import { InputLabel } from '@mui/material';
import { useAddDepartment } from '@/departments/hooks';

export type AddDepartmentModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddDepartmentModal = ({ open, onClose }: AddDepartmentModalProps) => {
  const { addDepartment, isPending } = useAddDepartment({ onSuccess: onClose });
  const { register, handleSubmit, formState } = useForm<AddDepartmentParams>({
    mode: 'onChange',
  });

  const onSubmit = async (values: AddDepartmentParams) => {
    return addDepartment(values);
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Add new department</Title>
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
            <AddButton loading={isPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default AddDepartmentModal;
