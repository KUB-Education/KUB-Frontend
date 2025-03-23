import { Room } from '@/rooms/entities';
import {
  Root,
  AddButton,
  DeleteButton,
  EditButton,
  ActionsListItem,
  ActionsList,
} from './styles.tsx';

export type RoomsToolbarProps = {
  selectedRooms: Room[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const RoomsToolbar = ({
  selectedRooms,
  className,
  onAdd,
  onDelete,
  onEdit,
}: RoomsToolbarProps) => {
  if (selectedRooms.length) {
    return (
      <Root className={className}>
        <ActionsList>
          {selectedRooms.length === 1 && (
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
          <AddButton onClick={onAdd}>Add new room</AddButton>
        </ActionsListItem>
      </ActionsList>
    </Root>
  );
};

export default RoomsToolbar;
