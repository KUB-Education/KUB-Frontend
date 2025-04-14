import { Department } from '@/departments/entities';
import {
  Root,
  AddButton,
  DeleteButton,
  EditButton,
  ActionsListItem,
  ActionsList,
} from './styles.tsx';

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
      <Root className={className}>
        <ActionsList>
          {selectedDepartments.length === 1 && (
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
          <AddButton onClick={onAdd}>Add new department</AddButton>
        </ActionsListItem>
      </ActionsList>
    </Root>
  );
};

export default DepartmentsToolbar;
