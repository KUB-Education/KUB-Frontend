import {
  Modal,
  AddButton,
  BackButton,
  FormTextField,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { AddRoomParams } from '@/rooms/entities';
import { InputLabel } from '@mui/material';
import {
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useAddRoom } from '@/rooms/hooks';

export type AddRoomModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddRoomModal = ({ open, onClose }: AddRoomModalProps) => {
  const { addRoom, isPending } = useAddRoom({ onSuccess: onClose });
  const { register, handleSubmit, formState } = useForm<AddRoomParams>({
    mode: 'onChange',
  });

  const onSubmit = async (values: AddRoomParams) => {
    return addRoom(values);
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Add new room</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <InputLabel shrink htmlFor="location">
              Location
            </InputLabel>
            <FormTextField
              label="location"
              {...register('location', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="capacity">
              Capacity
            </InputLabel>
            <FormTextField
              label="capacity"
              type="number"
              {...register('capacity', { 
                ...requiredValidator(), 
                validate: (value) => value >= 1 || 'Capacity must be at least 1',
                setValueAs: (value) => Number(value)
              })}
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

export default AddRoomModal;
