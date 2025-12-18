import { StudentGroup } from '@/student-groups/entities';
import {
  AddButton,
  DeleteButton,
  DetailsButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';

export type StudentGroupsToolbarProps = {
  selectedStudentGroups?: Array<StudentGroup>;
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onDetails: () => void;
};

const StudentGroupsToolbar = ({
  selectedStudentGroups = [],
  className,
  onAdd,
  onDelete,
  onDetails,
}: StudentGroupsToolbarProps) => {
  if (selectedStudentGroups.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDelete} />
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedStudentGroups.length === 1 && (
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
            <AddButton onClick={onAdd}>Add new student group</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default StudentGroupsToolbar;
