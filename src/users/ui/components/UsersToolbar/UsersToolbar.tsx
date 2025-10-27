import { isUserEmailSendingFailure, User } from '@/users/entities';
import { useMemo } from 'react';
import {
  AddButton,
  DeleteButton,
  EditButton,
  ResendButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';

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
      <Toolbar className={className}>
        <ToolbarActionsList>
          {isResendAvailable && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <ResendButton onClick={onResend} />
              </ToolbarAction>
            </ToolbarActionsListItem>
          )}
          {selectedUsers.length === 1 && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <EditButton onClick={onEdit} />
              </ToolbarAction>
            </ToolbarActionsListItem>
          )}
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDelete} />
            </ToolbarAction>
          </ToolbarActionsListItem>
        </ToolbarActionsList>
      </Toolbar>
    );
  }

  return (
    <Toolbar className={className}>
      <ToolbarActionsList>
        <ToolbarActionsListItem>
          <ToolbarAction>
            <AddButton onClick={onAdd}>Add new user</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default UsersToolbar;
