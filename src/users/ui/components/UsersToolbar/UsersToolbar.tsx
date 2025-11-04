import { isUserEmailSendingFailure, User } from '@/users/entities';
import { useMemo } from 'react';
import {
  AddButton,
  DeleteButton,
  DetailsButton,
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
  onDetails: () => void;
};

const UsersToolbar = ({
  selectedUsers = [],
  className,
  onAdd,
  onDelete,
  onResend,
  onDetails,
}: UsersToolbarProps) => {
  const isResendAvailable = useMemo(() => {
    const userWithoutResend = selectedUsers.find(
      (user) => !isUserEmailSendingFailure(user.status),
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
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDelete} />
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedUsers.length === 1 && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <DetailsButton onClick={onDetails} />
              </ToolbarAction>
            </ToolbarActionsListItem>
          )}
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
