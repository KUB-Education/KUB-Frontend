import { isUserEmailSendingFailure } from '@/users/entities';
import { useMemo } from 'react';
import { Student } from '@/students/entities';
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

export type StudentsToolbarProps = {
  selectedStudents?: Array<Student>;
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onResend: () => void;
  onEdit: () => void;
};

const StudentsToolbar = ({
  selectedStudents = [],
  className,
  onAdd,
  onDelete,
  onResend,
  onEdit,
}: StudentsToolbarProps) => {
  const isResendAvailable = useMemo(() => {
    const studentWithoutResend = selectedStudents.find(
      (student) => !isUserEmailSendingFailure(student),
    );
    return !studentWithoutResend;
  }, [selectedStudents]);

  if (selectedStudents.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          {isResendAvailable && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <ResendButton onClick={onResend} />
              </ToolbarAction>
            </ToolbarActionsListItem>
          )}
          {selectedStudents.length === 1 && (
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
            <AddButton onClick={onAdd}>Add new student</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default StudentsToolbar;
