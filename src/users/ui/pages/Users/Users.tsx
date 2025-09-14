import { Root, Table, Toolbar } from './styles';
import { useDeleteUser, useUsersQuery } from '@/users/hooks';
import { User, UserId } from '@/users/entities';
import { useMemo, useState } from 'react';

const Users = () => {
  const { users, isFetching, isError } = useUsersQuery();
  const { deleteUsers } = useDeleteUser();

  const [selectedUsers, setSelectedUsers] = useState<Array<User>>([]);

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
        onAdd={() => console.log('add')}
        onDelete={onDelete}
        selectedUsers={selectedUsers}
      />
      <Table
        data={users}
        isLoading={isFetching}
        isError={isError}
        onUsersSelected={setSelectedUsers}
      />
    </Root>
  );
};

export default Users;
