import { BaseService } from '@/common/services';
import { AddRoomParams, EditRoomParams, Room, RoomId } from '@/rooms/entities';
import { HttpClient } from '@/common/http-client';
import { RoomDto } from '@/rooms/services/dto';

export class RoomsService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async getRooms(): Promise<Room[]> {
    const { data } = await this.http.get<RoomDto[]>('/v1/rooms');
    return data;
  }

  async addRoom(params: AddRoomParams): Promise<Room> {
    const { data } = await this.http.post<RoomDto>('/v1/rooms', {
      data: params,
    });

    return data;
  }

  async deleteRooms(ids: Array<RoomId>): Promise<void> {
    // TODO: should we delete bulk?
    await Promise.all(ids.map((id) => this.http.delete(`/v1/rooms/${id}`)));
  }

  async editRoom(params: EditRoomParams) {
    const { location, capacity, id } = params;
    const { data } = await this.http.put<RoomDto>(`/v1/rooms/${id}`, {
      data: {
        location,
        capacity,
      },
    });

    return data;
  }
}
