import { Room, RoomId } from '@/rooms/entities';
import { Root, Toolbar, Table } from './styles';
import { useDeleteRooms, useRooms } from '@/rooms/hooks';
import { useMemo, useState } from 'react';
import { AddRoom, RoomDetails } from '@/rooms/ui/components';
import { ErrorModal, Modal } from '@/common/ui/components';

const Rooms = () => {
  const onDeleteError = () => {
    setIsDeleteErrorModalVisible(true);
  };

  const { rooms, isFetching, isError } = useRooms();
  const { deleteRooms, error: deleteError } = useDeleteRooms({
    onError: onDeleteError,
  });

  const [selectedRoomIds, setSelectedRoomIds] = useState<RoomId[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isDeleteErrorModalVisible, setIsDeleteErrorModalVisible] =
    useState(false);

  const selectedRooms = useMemo<Room[]>(() => {
    return rooms.reduce((acc: Array<Room>, room) => {
      return selectedRoomIds.includes(room.id) ? [...acc, room] : acc;
    }, []);
  }, [rooms, selectedRoomIds]);

  const onRoomsSelected = (rooms: Array<Room>) => {
    const roomIds = rooms.map((room) => room.id);
    setSelectedRoomIds(roomIds);
  };

  const onDelete = () => {
    if (!selectedRoomIds.length) return;

    deleteRooms(selectedRoomIds);
  };

  const onDetails = () => {
    setIsDetailsModalVisible(true);
  };

  return (
    <Root>
      <Toolbar
        selectedRooms={selectedRooms}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onEdit={onDetails}
      />
      <Table
        data={rooms}
        isLoading={isFetching}
        isError={isError}
        onRoomsSelected={onRoomsSelected}
      />

      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <AddRoom
          onBack={() => setIsAddModalVisible(false)}
          onSucceed={() => setIsAddModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
      >
        <RoomDetails
          room={selectedRooms[0]}
          onBack={() => setIsDetailsModalVisible(false)}
          onSucceed={() => setIsDetailsModalVisible(false)}
        />
      </Modal>

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
