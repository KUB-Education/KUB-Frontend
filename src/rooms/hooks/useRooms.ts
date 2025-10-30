import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const roomsQueryKey = 'roomsQuery';

export function useRooms() {
  const { roomsService } = useAppServices();

  const { data: rooms, ...otherData } = useQuery({
    queryKey: [roomsQueryKey],
    queryFn: () => {
      return roomsService.getRooms();
    },
    initialData: [],
  });

  return { rooms, ...otherData };
}
