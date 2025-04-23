import { BaseService } from '@/common/services';
import { AddRoomParams, EditRoomParams, Room, RoomId } from '@/rooms/entities';
import { HttpClient } from '@/common/http-client';
import { RoomDto } from '@/rooms/services/dto';

export class RoomsService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async getRooms(): Promise<Room[]> {
    const { data } = await this.http.get<RoomDto[]>('/rooms');
    return data;
  }

  async addRoom(params: AddRoomParams): Promise<Room> {
    const { data } = await this.http.post<RoomDto>('/rooms', {
      data: params,
    });

    return data;
  }

  async deleteRooms(ids: Array<RoomId>): Promise<void> {
    // TODO: should we delete bulk?
    await Promise.all(ids.map((id) => this.http.delete(`/rooms/${id}`)));
  }

  async editRoom(params: EditRoomParams) {
    const { location, capacity, id } = params;
    const { data } = await this.http.put<RoomDto>(`/rooms/${id}`, {
      data: {
        location,
        capacity,
      },
    });

    return data;
  }
}
