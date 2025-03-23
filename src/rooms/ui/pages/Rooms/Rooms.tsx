import { Room, RoomId } from '@/rooms/entities';
import { Root, Toolbar, Table } from './styles';
import {
  useDeleteRooms,
  useRoomsQuery,
} from '@/rooms/hooks';
import { useMemo, useState } from 'react';
import { AddRoomModal, EditRoomModal } from '@/rooms/ui/components';

const Rooms = () => {
  const { rooms } = useRoomsQuery();
  const { deleteRooms } = useDeleteRooms();

  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedRoomsIds = useMemo<RoomId[]>(() => {
    return selectedRooms.map((room) => room.id);
  }, [selectedRooms]);

  const onDelete = () => {
    if (!selectedRoomsIds.length) return;

    deleteRooms(selectedRoomsIds);
  };

  const onEdit = () => {
    setIsEditModalVisible(true);
  };

  return (
    <Root>
      <Toolbar
        selectedRooms={selectedRooms}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Table data={rooms} onRoomsSelected={setSelectedRooms} />

      <AddRoomModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
      <EditRoomModal
        open={isEditModalVisible}
        room={selectedRooms[0]}
        onClose={() => setIsEditModalVisible(false)}
      />
    </Root>
  );
};

export default Rooms;
