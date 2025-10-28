import { RoomId } from '@/rooms/entities';

export type RoomDto = {
  id: RoomId;
  location: string;
  capacity: number;
  description: string;
};
