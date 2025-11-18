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
  EditRoomParams,
  Room,
  roomCapacityValidator,
  roomLocationValidator,
} from '@/rooms/entities';
import { useEditRoom } from '@/rooms/hooks';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';

export type RoomDetailsProps = {
  room: Room;
  onBack: () => void;
  onSucceed: () => void;
};

type Inputs = Omit<EditRoomParams, 'id'>;

const RoomDetails = ({ room, onBack, onSucceed }: RoomDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { editRoom, isPending, error } = useEditRoom({
    onSuccess: onSucceed,
    onError,
  });
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { ...room },
  });

  const onSubmit = async (values: Inputs) => {
    return editRoom({ ...values, id: room.id });
  };

  const { isValid, isDirty } = formState;

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Room information</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="lastName">
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
            {...register('description')}
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
        {error?.message}
      </ErrorModal>
    </Content>
  );
};

export default RoomDetails;
