import { Room, RoomId } from '@/rooms/entities';
import { Root, Toolbar, Table } from './styles';
import { useDeleteRooms, useRoomsQuery } from '@/rooms/hooks';
import { useMemo, useState } from 'react';
import { AddRoomModal, EditRoomModal } from '@/rooms/ui/components';
import { ErrorModal } from '@/common/ui/components';

const Rooms = () => {
  const onDeleteError = () => {
    setIsDeleteErrorModalVisible(true);
  };

  const { rooms, isFetching, isError } = useRoomsQuery();
  const { deleteRooms, error: deleteError } = useDeleteRooms({
    onError: onDeleteError,
  });

  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteErrorModalVisible, setIsDeleteErrorModalVisible] =
    useState(false);

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
      <Table
        data={rooms}
        isLoading={isFetching}
        isError={isError}
        onRoomsSelected={setSelectedRooms}
      />

      <AddRoomModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
      <EditRoomModal
        open={isEditModalVisible}
        room={selectedRooms[0]}
        onClose={() => setIsEditModalVisible(false)}
      />

      <ErrorModal
        open={isDeleteErrorModalVisible}
        onClose={() => setIsDeleteErrorModalVisible(false)}
        onContinue={() => setIsDeleteErrorModalVisible(false)}
      >
        {deleteError?.message}
      </ErrorModal>
    </Root>
  );
};

export default Rooms;
