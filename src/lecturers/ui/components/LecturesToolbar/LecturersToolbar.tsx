import { useMemo } from 'react';
import { Lecturer } from '@/lecturers/entities';
import {
  AddButton,
  DeleteButton,
  DetailsButton,
  ResendButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';
import { isUserEmailSendingFailure } from '@/users/entities';

export type LecturesToolbarProps = {
  selectedLecturers: Lecturer[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onResend: () => void;
  onDetails: () => void;
};

const LecturersToolbar = ({
  selectedLecturers,
  className,
  onAdd,
  onDelete,
  onResend,
  onDetails,
}: LecturesToolbarProps) => {
  const isResendAvailable = useMemo(() => {
    const lecturerWithoutResend = selectedLecturers.find(
      (lecturer) => !isUserEmailSendingFailure(lecturer.userStatus),
    );
    return !lecturerWithoutResend;
  }, [selectedLecturers]);

  if (selectedLecturers.length) {
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
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDelete} />
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedLecturers.length === 1 && (
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
            <AddButton onClick={onAdd}>Add new lecturer</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default LecturersToolbar;
