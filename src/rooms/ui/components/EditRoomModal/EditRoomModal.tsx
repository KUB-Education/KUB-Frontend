import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import {
  EditRoomParams,
  Room,
  roomCapacityValidator,
  roomLocationValidator,
} from '@/rooms/entities';
import { InputLabel } from '@mui/material';
import { useEditRoom } from '@/rooms/hooks';

export type EditRoomModalProps = {
  open: boolean;
  room: Room;
  onClose: () => void;
};

type Inputs = Omit<EditRoomParams, 'id'>;

const EditRoomModal = ({ open, onClose, room }: EditRoomModalProps) => {
  const { editRoom, isPending } = useEditRoom({ onSuccess: onClose });
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...room },
  });

  const onSubmit = async (values: Inputs) => {
    return editRoom({ ...values, id: room.id });
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Room information</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <InputLabel shrink htmlFor="lastName">
              Location
            </InputLabel>
            <FormTextField
              label="location"
              {...register('location', { ...roomLocationValidator })}
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
                ...roomCapacityValidator,
                setValueAs: (value) => Number(value),
              })}
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

export default EditRoomModal;
