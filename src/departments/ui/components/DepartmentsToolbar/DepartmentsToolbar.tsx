import { Department } from '@/departments/entities';
import {
  AddButton,
  DeleteButton,
  EditButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';

export type DepartmentsToolbarProps = {
  selectedDepartments: Department[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const DepartmentsToolbar = ({
  selectedDepartments,
  className,
  onAdd,
  onDelete,
  onEdit,
}: DepartmentsToolbarProps) => {
  if (selectedDepartments.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          {selectedDepartments.length === 1 && (
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
            <AddButton onClick={onAdd}>Add new department</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default DepartmentsToolbar;
