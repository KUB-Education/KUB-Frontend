import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import {
  AddRoomParams,
  EditRoomParams,
  Room,
  RoomId,
} from '@/rooms/entities';
import { delay, SECOND } from '@/common/utils';

export class RoomsService extends BaseService {
  private rooms: Room[] = [];

  constructor() {
    super();

    const array = new Array(5).fill(null);
    
    this.rooms = array.map(() => ({
      id: faker.number.int({ min: 1, max: 100 }),
      location: `Room ${faker.number.int({ min: 1, max: 999 })}${faker.string.alpha({ length: 1 }).toUpperCase()}`,
      capacity: faker.number.int({ min: 1, max: 100 }),
    }));
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }

  async addRoom(params: AddRoomParams) {
    await delay(5 * SECOND);
    this.rooms.push({
      ...params,
      id: faker.number.int(),
    });
  }

  async deleteRooms(ids: Array<RoomId>) {
    await delay(2 * SECOND);
    this.rooms = this.rooms.filter(
      (room) => !ids.includes(room.id),
    );
  }

  async editRoom(params: EditRoomParams) {
    await delay(5 * SECOND);
    this.rooms = this.rooms.map((room) => {
      if (room.id !== params.id) return room;

      return { ...room, ...params };
    });
  }
}
