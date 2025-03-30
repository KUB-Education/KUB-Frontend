import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { roomsQueryKey } from './useRoomsQuery.ts';
import { AddRoomParams } from '@/rooms/entities';

type UseAddRoomParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useAddRoom({
  onSuccess,
  onError,
}: UseAddRoomParams = {}) {
  const { roomsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addRoom, ...otherProps } = useMutation<
    void,
    Error,
    AddRoomParams
  >({
    mutationFn: async (params) => {
      await roomsService.addRoom(params);
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
    addRoom,
    ...otherProps,
  };
}
