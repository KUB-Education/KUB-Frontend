import { Department } from '@/departments/entities';
import {
  AddButton,
  DeleteButton,
  DetailsButton,
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
  onDetails: () => void;
};

const DepartmentsToolbar = ({
  selectedDepartments,
  className,
  onAdd,
  onDelete,
  onDetails,
}: DepartmentsToolbarProps) => {
  if (selectedDepartments.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDelete} />
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedDepartments.length === 1 && (
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
            <AddButton onClick={onAdd}>Add new department</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default DepartmentsToolbar;
