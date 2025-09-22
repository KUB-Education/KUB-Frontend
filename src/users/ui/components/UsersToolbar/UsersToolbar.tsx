import {
  ActionsList,
  ActionsListItem,
  AddButton,
  Root,
  EditButton,
  DeleteButton,
  ResendButton,
} from './styles';
import { isUserEmailSendingFailure, User } from '@/users/entities';
import { useMemo } from 'react';

export type UsersToolbarProps = {
  selectedUsers?: Array<User>;
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onResend: () => void;
  onEdit: () => void;
};

const UsersToolbar = ({
  selectedUsers = [],
  className,
  onAdd,
  onDelete,
  onResend,
  onEdit,
}: UsersToolbarProps) => {
  const isResendAvailable = useMemo(() => {
    const userWithoutResend = selectedUsers.find(
      (user) => !isUserEmailSendingFailure(user),
    );
    return !userWithoutResend;
  }, [selectedUsers]);

  if (selectedUsers.length) {
    return (
      <Root className={className}>
        <ActionsList>
          {isResendAvailable && (
            <ActionsListItem>
              <ResendButton onClick={onResend} />
            </ActionsListItem>
          )}
          {selectedUsers.length === 1 && (
            <ActionsListItem>
              <EditButton onClick={onEdit} />
            </ActionsListItem>
          )}
          <ActionsListItem>
            <DeleteButton onClick={onDelete} />
          </ActionsListItem>
        </ActionsList>
      </Root>
    );
  }

  return (
    <Root className={className}>
      <ActionsList>
        <ActionsListItem>
          <AddButton onClick={onAdd}>Add new user</AddButton>
        </ActionsListItem>
      </ActionsList>
    </Root>
  );
};

export default UsersToolbar;
