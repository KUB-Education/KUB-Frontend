import { Lecturer } from '@/lecturers/entities';
import {
  Root,
  AddButton,
  DeleteButton,
  ResendButton,
  EditButton,
  ActionsListItem,
  ActionsList,
} from './styles.tsx';

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
      <Root className={className}>
        <ActionsList>
          {selectedLecturers.length === 1 && (
            <ActionsListItem>
              <EditButton onClick={onEdit} />
            </ActionsListItem>
          )}
          <ActionsListItem>
            <DeleteButton onClick={onDelete} />
          </ActionsListItem>
          <ActionsListItem>
            <ResendButton onClick={onResend} />
          </ActionsListItem>
        </ActionsList>
      </Root>
    );
  }

  return (
    <Root className={className}>
      <ActionsList>
        <ActionsListItem>
          <AddButton onClick={onAdd}>Add new lecturer</AddButton>
        </ActionsListItem>
      </ActionsList>
    </Root>
  );
};

export default LecturersToolbar;
