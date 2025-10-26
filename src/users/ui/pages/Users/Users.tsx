import { Root, Table, Toolbar } from './styles';
import {
  useDeleteUsers,
  useUsersQuery,
  useResendUsersActivationEmail,
} from '@/users/hooks';
import { getUserId, User, UserId } from '@/users/entities';
import { useMemo, useState } from 'react';
import { AddUser, EditUser } from '@/users/ui/components';
import { Modal } from '@/common/ui/components';

const Users = () => {
  const { users, isFetching, isError } = useUsersQuery();
  const { deleteUsers } = useDeleteUsers();
  const { resendUsersActivationEmail } = useResendUsersActivationEmail();

  const [selectedUserIds, setSelectedUserIds] = useState<Array<UserId>>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedUsers = useMemo<User[]>(() => {
    return users.reduce((acc: Array<User>, user) => {
      return selectedUserIds.includes(user.id) ? [...acc, user] : acc;
    }, []);
  }, [users, selectedUserIds]);

  const onUserSelected = (users: Array<User>) => {
    const userIds = users.map(getUserId);
    setSelectedUserIds(userIds);
  };

  const onDelete = () => {
    if (!selectedUserIds.length) return;

    deleteUsers(selectedUserIds);
  };

  const onResend = () => {
    if (!selectedUserIds.length) return;

    resendUsersActivationEmail(selectedUserIds);
  };

  return (
    <Root>
      <Toolbar
        selectedUsers={selectedUsers}
        onAdd={() => setIsAddModalVisible(true)}
        onEdit={() => setIsEditModalVisible(true)}
        onDelete={onDelete}
        onResend={onResend}
      />
      <Table
        data={users}
        isLoading={isFetching}
        isError={isError}
        onUsersSelected={onUserSelected}
      />

      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <AddUser
          onBack={() => setIsAddModalVisible(false)}
          onSucceed={() => setIsAddModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
      >
        <EditUser
          user={selectedUsers[0]}
          onDeleted={() => setIsEditModalVisible(false)}
          onBack={() => setIsEditModalVisible(false)}
        />
      </Modal>
    </Root>
  );
};

export default Users;
