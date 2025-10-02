import { Lecturer } from '@/lecturers/entities';
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

export type LecturesToolbarProps = {
  selectedLecturers: Lecturer[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onResend: () => void;
  onEdit: () => void;
};

const LecturersToolbar = ({
  selectedLecturers,
  className,
  onAdd,
  onDelete,
  onResend,
  onEdit,
}: LecturesToolbarProps) => {
  if (selectedLecturers.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <ResendButton onClick={onResend} />
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedLecturers.length === 1 && (
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
            <AddButton onClick={onAdd}>Add new lecturer</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default LecturersToolbar;
