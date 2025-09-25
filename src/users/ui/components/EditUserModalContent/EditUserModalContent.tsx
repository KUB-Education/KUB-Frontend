import { BackButton, DeleteButton, ErrorModal } from '@/common/ui/components';
import {
  Actions,
  Col,
  Content,
  Row,
  Title,
  EditForm,
  EditRolesForm,
} from './styles.tsx';
import { EditUserParams, User, UserRole } from '@/users/entities';
import { useMemo, useState } from 'react';
import {
  useEditUser,
  useResendUsersActivationEmail,
  useGetUserRoles,
  useAddUserRole,
  useDeleteUserRole,
  useDeleteUsers,
} from '@/users/hooks';

export type EditUserModalContentProps = {
  user: User;
  onClose: () => void;
};

const EditUserModalContent = ({ onClose, user }: EditUserModalContentProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const { userRoles } = useGetUserRoles(user.id);
  const {
    editUser,
    isPending: isEditPending,
    error,
  } = useEditUser({ onError });
  const { deleteUsers, isPending: isDeletePending } = useDeleteUsers({
    onSuccess: onClose,
  });
  const { resendUsersActivationEmail, isPending: isResendPending } =
    useResendUsersActivationEmail({ onError });
  const { addUserRole, isPending: isAddRolePending } = useAddUserRole();
  const { deleteUserRole, isPending: isDeleteRolePending } =
    useDeleteUserRole();

  const isEditFormPending = useMemo(() => {
    return isDeletePending || isEditPending || isResendPending;
  }, [isEditPending, isResendPending, isDeletePending]);

  const isEditRolesFormPending = useMemo(() => {
    return isDeletePending || isAddRolePending || isDeleteRolePending;
  }, [isAddRolePending, isDeleteRolePending, isDeletePending]);

  const onEdit = async (data: EditUserParams) => {
    return editUser(data);
  };

  const onDelete = async () => {
    deleteUsers([user.id]);
  };

  const onAddRole = async (role: UserRole) => {
    addUserRole({ userId: user.id, role: role });
  };

  const onDeleteRole = async (role: UserRole) => {
    deleteUserRole({ userId: user.id, role: role });
  };

  const onResend = async () => {
    resendUsersActivationEmail([user.id]);
  };

  return (
    <Content>
      <Row>
        <Col>
          <Title>User information</Title>
          <EditForm
            user={user}
            isPending={isEditFormPending}
            onEdit={onEdit}
            onResend={onResend}
          />
        </Col>
        <Col>
          <Title>User roles</Title>
          <EditRolesForm
            userRoles={userRoles}
            isPending={isEditRolesFormPending}
            onAdd={onAddRole}
            onDelete={onDeleteRole}
          />
        </Col>
      </Row>
      <Actions>
        <BackButton onClick={onClose} />
        <DeleteButton disabled={isDeletePending} onClick={onDelete}>
          Delete user
        </DeleteButton>
      </Actions>

      <ErrorModal
        open={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        onContinue={() => setIsErrorModalVisible(false)}
      >
        {error?.message}
      </ErrorModal>
    </Content>
  );
};

export default EditUserModalContent;
