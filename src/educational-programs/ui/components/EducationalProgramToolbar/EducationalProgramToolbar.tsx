import {
  AddButton,
  DeleteButton,
  DetailsButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';
import { StudyField } from '@/study-fields/entities';
import { Speciality } from '@/specialities/entities';
import { EducationalProgram } from '@/educational-programs/entities';

export type EducationalProgramToolbarProps = {
  selectedStudyFields: StudyField[];
  selectedSpecialities: Speciality[];
  selectedEducationalPrograms: EducationalProgram[];
  className?: string;
  onAddStudyField: () => void;
  onDeleteStudyField: () => void;
  onStudyFieldDetails: () => void;

  onAddSpeciality: () => void;
  onDeleteSpeciality: () => void;
  onSpecialityDetails: () => void;

  onAddEducationalProgram: () => void;
  onDeleteEducationalProgram: () => void;
  onEducationalProgramDetails: () => void;
};

const EducationalProgramToolbar = ({
  selectedStudyFields,
  selectedSpecialities,
  selectedEducationalPrograms,
  className,
  onAddStudyField,
  onDeleteStudyField,
  onStudyFieldDetails,
  onAddSpeciality,
  onDeleteSpeciality,
  onSpecialityDetails,
  onAddEducationalProgram,
  onDeleteEducationalProgram,
  onEducationalProgramDetails,
}: EducationalProgramToolbarProps) => {
  if (selectedEducationalPrograms.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDeleteEducationalProgram}>
                Delete educational programs
              </DeleteButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedStudyFields.length === 1 && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <DetailsButton onClick={onEducationalProgramDetails}>
                  Educational program details
                </DetailsButton>
              </ToolbarAction>
            </ToolbarActionsListItem>
          )}
        </ToolbarActionsList>
      </Toolbar>
    );
  }

  if (selectedSpecialities.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDeleteSpeciality}>
                Delete speciality
              </DeleteButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <AddButton onClick={onAddEducationalProgram}>
                Add new educational program
              </AddButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedStudyFields.length === 1 && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <DetailsButton onClick={onSpecialityDetails}>
                  Speciality details
                </DetailsButton>
              </ToolbarAction>
            </ToolbarActionsListItem>
          )}
        </ToolbarActionsList>
      </Toolbar>
    );
  }

  if (selectedStudyFields.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDeleteStudyField}>
                Delete study field
              </DeleteButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <AddButton onClick={onAddSpeciality}>
                Add new speciality
              </AddButton>
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedStudyFields.length === 1 && (
            <ToolbarActionsListItem>
              <ToolbarAction>
                <DetailsButton onClick={onStudyFieldDetails}>
                  Study field details
                </DetailsButton>
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
            <AddButton onClick={onAddStudyField}>Add new study field</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default EducationalProgramToolbar;
