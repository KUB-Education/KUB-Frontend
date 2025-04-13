import { EducationalProgram } from '@/educational-programs/entities';
import {
  Root,
  AddButton,
  DeleteButton,
  EditButton,
  ActionsListItem,
  ActionsList,
} from './styles.tsx';

export type EPToolbarProps = {
  selectedRooms: EducationalProgram[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const EPToolbar = ({
  selectedRooms,
  className,
  onAdd,
  onDelete,
  onEdit,
}: EPToolbarProps) => {
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

export default EPToolbar;
