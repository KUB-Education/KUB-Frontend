import { Root, Table, Toolbar } from './styles';
import { useDeleteUser, useUsersQuery } from '@/users/hooks';
import { User, UserId } from '@/users/entities';
import { useMemo, useState } from 'react';
import { AddUserModal } from '@/users/ui/components';

const Users = () => {
  const { users, isFetching, isError } = useUsersQuery();
  const { deleteUsers } = useDeleteUser();

  const [selectedUsers, setSelectedUsers] = useState<Array<User>>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const selectedUserIds = useMemo<UserId[]>(() => {
    return selectedUsers.map((room) => room.id);
  }, [selectedUsers]);

  const onDelete = () => {
    if (!selectedUserIds.length) return;

    deleteUsers(selectedUserIds);
  };

  return (
    <Root>
      <Toolbar
        selectedUsers={selectedUsers}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
      />
      <Table
        data={users}
        isLoading={isFetching}
        isError={isError}
        onUsersSelected={setSelectedUsers}
      />

      <AddUserModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
    </Root>
  );
};

export default Users;
