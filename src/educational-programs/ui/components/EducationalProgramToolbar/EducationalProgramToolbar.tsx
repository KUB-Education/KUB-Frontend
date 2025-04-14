import { EducationalProgram } from '@/educational-programs/entities';
import {
  Root,
  AddButton,
  DeleteButton,
  EditButton,
  ActionsListItem,
  ActionsList,
} from './styles.tsx';

export type EducationalProgramToolbarProps = {
  selectedRooms: EducationalProgram[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const EducationalProgramToolbar = ({
  selectedRooms,
  className,
  onAdd,
  onDelete,
  onEdit,
}: EducationalProgramToolbarProps) => {
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
          <AddButton onClick={onAdd}>Add new educational program</AddButton>
        </ActionsListItem>
      </ActionsList>
    </Root>
  );
};

export default EducationalProgramToolbar;
