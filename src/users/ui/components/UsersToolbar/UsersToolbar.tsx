import {
  ActionsList,
  ActionsListItem,
  AddButton,
  Root,
  EditButton,
  DeleteButton,
} from './styles';
import { User } from '@/users/entities';

export type UsersToolbarProps = {
  selectedUsers?: Array<User>;
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
};

const UsersToolbar = ({
  selectedUsers = [],
  className,
  onAdd,
  onDelete,
}: UsersToolbarProps) => {
  if (selectedUsers.length) {
    return (
      <Root className={className}>
        <ActionsList>
          {selectedUsers.length === 1 && (
            <ActionsListItem>
              <EditButton onClick={onDelete} />
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
