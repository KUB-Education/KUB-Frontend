import { Student } from '@/students/ui/pages/entities';
import {
  Root,
  AddButton,
  DeleteButton,
  ResendButton,
  EditButton,
  ActionsListItem,
  ActionsList,
  ViewEducationalProgramButton,
} from './styles.tsx';

export type StudentsToolbarProps = {
  selectedStudents: Student[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onResend: () => void;
  onEdit: () => void;
  //onRedirectStudentPrograms: () => void;
};

const StudentsToolbar = ({
  selectedStudents,
  className,
  onAdd,
  onDelete,
  onResend,
  onEdit,
}: StudentsToolbarProps) => {
  if (selectedStudents.length) {
    return (
      <Root className={className}>
        <ActionsList>
          <ActionsListItem>
            <ResendButton onClick={onResend} />
          </ActionsListItem>
          {selectedStudents.length === 1 && (
            <ActionsListItem>
              <EditButton onClick={onEdit} />
            </ActionsListItem>
          )}
          <ActionsListItem>
            <DeleteButton onClick={onDelete} />
          </ActionsListItem>
          <ActionsListItem>
            <ViewEducationalProgramButton />
            {/* onClick={onRedirectStudentPrograms} */}
          </ActionsListItem>
        </ActionsList>
      </Root>
    );
  }

  return (
    <Root className={className}>
      <ActionsList>
        <ActionsListItem>
          <AddButton onClick={onAdd}>Add new student</AddButton>
        </ActionsListItem>
      </ActionsList>
    </Root>
  );
};

export default StudentsToolbar;
