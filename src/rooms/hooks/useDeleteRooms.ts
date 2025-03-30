import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { roomsQueryKey } from './useRoomsQuery.ts';
import { RoomId } from '@/rooms/entities';

type UseDeleteRoomsParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useDeleteRooms({
  onSuccess,
  onError,
}: UseDeleteRoomsParams = {}) {
  const { roomsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteRooms, ...otherProps } = useMutation<
    void,
    Error,
    Array<RoomId>
  >({
    mutationFn: async (params) => {
      await roomsService.deleteRooms(params);
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
    deleteRooms,
    ...otherProps,
  };
}
