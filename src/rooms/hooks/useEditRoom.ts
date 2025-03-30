import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { roomsQueryKey } from './useRoomsQuery.ts';
import { EditRoomParams } from '@/rooms/entities';

type UseEditRoomParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useEditRoom({
  onSuccess,
  onError,
}: UseEditRoomParams = {}) {
  const { roomsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editRoom, ...otherProps } = useMutation<
    void,
    Error,
    EditRoomParams
  >({
    mutationFn: async (params) => {
      await roomsService.editRoom(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [roomsQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    editRoom,
    ...otherProps,
  };
}
