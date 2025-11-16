import {
  AddButton,
  DeleteButton,
  DetailsButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';
import { Term } from '@/terms/entities';
import { Subject } from '@/subjects/entities';
import { SubjectActivity } from '@/subject-activities/entities';

export type EducationalProgramToolbarProps = {
  selectedTerms: Term[];
  selectedSubjects: Subject[];
  selectedSubjectActivities: SubjectActivity[];
  className?: string;
  onAddTerm: () => void;
  onDeleteTerm: () => void;
  onTermDetails: () => void;
  onAddSubject: () => void;
  onDeleteSubject: () => void;
  onSubjectDetails: () => void;
  onAddSubjectActivity: () => void;
  onDeleteSubjectActivity: () => void;
  onSubjectActivityDetails: () => void;
};

const EducationalProgramToolbar = ({
  selectedTerms,
  selectedSubjects,
  selectedSubjectActivities,
  className,
  onAddTerm,
  onTermDetails,
  onDeleteTerm,
  onAddSubject,
  onSubjectDetails,
  onDeleteSubject,
  onAddSubjectActivity,
  onSubjectActivityDetails,
  onDeleteSubjectActivity,
}: EducationalProgramToolbarProps) => {
  if (selectedSubjectActivities.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDeleteSubjectActivity}>
                Delete subject activity
              </DeleteButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedSubjectActivities.length === 1 && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <DetailsButton onClick={onSubjectActivityDetails}>
                  Subject activity details
                </DetailsButton>
              </ToolbarAction>
            </ToolbarActionsListItem>
          )}
        </ToolbarActionsList>
      </Toolbar>
    );
  }

  if (selectedSubjects.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDeleteSubject}>
                Delete subject
              </DeleteButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedSubjects.length === 1 && (
            <>
              <ToolbarActionsListItem>
                <ToolbarAction>
                  <AddButton onClick={onAddSubjectActivity}>
                    Add new subject activity
                  </AddButton>
                </ToolbarAction>
              </ToolbarActionsListItem>
              <ToolbarActionsListItem>
                <ToolbarAction>
                  <DetailsButton onClick={onSubjectDetails}>
                    Subject details
                  </DetailsButton>
                </ToolbarAction>
              </ToolbarActionsListItem>
            </>
          )}
        </ToolbarActionsList>
      </Toolbar>
    );
  }

  if (selectedTerms.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDeleteTerm}>Delete term</DeleteButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedTerms.length === 1 && (
            <>
              <ToolbarActionsListItem>
                <ToolbarAction>
                  <AddButton onClick={onAddSubject}>Add new subject</AddButton>
                </ToolbarAction>
              </ToolbarActionsListItem>
              <ToolbarActionsListItem>
                <ToolbarAction>
                  <DetailsButton onClick={onTermDetails}>
                    Term details
                  </DetailsButton>
                </ToolbarAction>
              </ToolbarActionsListItem>
            </>
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
            <AddButton onClick={onAddTerm}>Add new term</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default EducationalProgramToolbar;
