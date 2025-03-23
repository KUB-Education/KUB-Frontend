import { RoomId } from './Room.ts';

export type EditRoomParams = {
  id: RoomId;
  location?: string;
  capacity?: number;
};
