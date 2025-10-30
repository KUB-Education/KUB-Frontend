import {
  Modal,
  AddButton,
  BackButton,
  FormTextField,
  ErrorModal,
  FieldLabel,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import {
  AddRoomParams,
  roomCapacityValidator,
  roomLocationValidator,
} from '@/rooms/entities';
import { useAddRoom } from '@/rooms/hooks';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';

export type AddRoomModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddRoomModal = ({ open, onClose }: AddRoomModalProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<AddRoomParams>({
    mode: 'onChange',
  });
  const { addRoom, isPending, error } = useAddRoom({
    onSuccess: onClose,
    onError,
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
            <FieldLabel shrink htmlFor="location">
              Location
            </FieldLabel>
            <FormTextField
              label="location"
              {...register('location', { ...roomLocationValidator })}
            />
          </FormControl>
          <FormControl>
            <FieldLabel shrink htmlFor="capacity">
              Capacity
            </FieldLabel>
            <FormTextField
              label="capacity"
              type="number"
              {...register('capacity', {
                ...roomCapacityValidator,
                setValueAs: (value) => Number(value),
              })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="description">
              Description
            </InputLabel>
            <FormTextField
              label="description"
              type="string"
              multiline
              minRows={8}
              {...register('description', {
              })}
            />
          </FormControl>
          <Actions>
            <BackButton onClick={onClose} />
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
    </Modal>
  );
};

export default AddRoomModal;
