import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { EditLecturerParams, Lecturer } from '@/lecturers/entities';
import { InputLabel } from '@mui/material';
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useEditLecturer } from '@/lecturers/hooks';

export type EditLecturerModalProps = {
  open: boolean;
  lecturer: Lecturer;
  onClose: () => void;
};

type Inputs = Omit<EditLecturerParams, 'id'>;

const EditLecturerModal = ({
  open,
  onClose,
  lecturer,
}: EditLecturerModalProps) => {
  const { editLecturer, isPending } = useEditLecturer({ onSuccess: onClose });
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...lecturer },
  });

  const onSubmit = async (values: Inputs) => {
    return editLecturer({ ...values, id: lecturer.id });
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Lecturer information</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <InputLabel shrink htmlFor="lastName">
              Last Name
            </InputLabel>
            <FormTextField
              label="lastName"
              {...register('lastName', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="firstName">
              First Name
            </InputLabel>
            <FormTextField
              label="firstName"
              {...register('firstName', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="middleName">
              Middle Name
            </InputLabel>
            <FormTextField
              label="middleName"
              {...register('middleName', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <FormTextField
              label="Email"
              type="email"
              {...register('email', {
                ...requiredValidator(),
                ...emailValidator(),
              })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="department">
              Department
            </InputLabel>
            <FormTextField
              label="department"
              {...register('department', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="academicTitle">
              Academic title
            </InputLabel>
            <FormTextField
              label="academicTitle"
              {...register('academicTitle', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="position">
              Position
            </InputLabel>
            <FormTextField
              label="position"
              {...register('position', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="status">
              Status
            </InputLabel>
            <FormTextField
              label="status"
              {...register('status', { ...requiredValidator() })}
            />
          </FormControl>
          <Actions>
            <BackButton onClick={onClose} />
            <SaveButton loading={isPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default EditLecturerModal;
