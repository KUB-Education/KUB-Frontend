import { Room } from '@/rooms/entities';
import {
  AddButton,
  DeleteButton,
  EditButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';

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
      <Toolbar className={className}>
        <ToolbarActionsList>
          {selectedRooms.length === 1 && (
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
            <AddButton onClick={onAdd}>Add new room</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default RoomsToolbar;
