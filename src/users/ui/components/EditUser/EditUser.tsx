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
  useAddUserRole,
  useDeleteUserRole,
  useDeleteUsers,
  useRoles,
} from '@/users/hooks';

export type EditUserProps = {
  user: User;
  onDeleted: () => void;
  onBack: () => void;
};

const EditUser = ({ user, onBack, onDeleted }: EditUserProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const { roles } = useRoles();
  const {
    editUser,
    isPending: isEditPending,
    error: editUserError,
  } = useEditUser({ onError });
  const {
    deleteUsers,
    isPending: isDeletePending,
    error: deleteUsersError,
  } = useDeleteUsers({ onSuccess: onDeleted, onError });
  const {
    resendUsersActivationEmail,
    isPending: isResendPending,
    error: resendEmailError,
  } = useResendUsersActivationEmail({ onError });
  const {
    addUserRole,
    isPending: isAddRolePending,
    error: addRoleError,
  } = useAddUserRole({ onError });
  const {
    deleteUserRole,
    isPending: isDeleteRolePending,
    error: deleteRoleError,
  } = useDeleteUserRole({ onError });

  const isEditFormPending = useMemo(() => {
    return isDeletePending || isEditPending || isResendPending;
  }, [isEditPending, isResendPending, isDeletePending]);

  const isEditRolesFormPending = useMemo(() => {
    return isDeletePending || isAddRolePending || isDeleteRolePending;
  }, [isAddRolePending, isDeleteRolePending, isDeletePending]);

  const error = useMemo(() => {
    const errors = [
      editUserError,
      deleteUsersError,
      resendEmailError,
      addRoleError,
      deleteRoleError,
    ].filter(Boolean);

    return errors[0];
  }, [
    editUserError,
    deleteUsersError,
    resendEmailError,
    addRoleError,
    deleteRoleError,
  ]);

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
            roles={roles}
            userRoles={user.roles}
            isPending={isEditRolesFormPending}
            onAdd={onAddRole}
            onDelete={onDeleteRole}
          />
        </Col>
      </Row>
      <Actions>
        <BackButton onClick={onBack} />
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

export default EditUser;
