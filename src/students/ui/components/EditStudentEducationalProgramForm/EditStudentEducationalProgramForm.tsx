import {
  FormControl,
  Root,
  ProgramActions,
  ProgramDelete,
  ProgramInfo,
  ProgramList,
  ProgramListItem,
  Actions,
} from './styles.tsx';
import {
  FieldLabel,
  FormTextField,
  SaveButton,
  Condition,
} from '@/common/ui/components';
import { useMemo } from 'react';
import { difference } from '@/common/utils';
import { EducationalProgram } from '@/educational-programs/entities';
import {
  StudentEducationalProgram,
  StudentEducationalProgramId,
} from '@/students/entities';

export type EditStudentEducationalProgramFormProps = {
  studentEducationalPrograms: Array<StudentEducationalProgram>;
  educationalPrograms: Array<EducationalProgram>;
  isPending: boolean;
  className?: string;
  onAdd: () => void;
  onDetails: (id: StudentEducationalProgramId) => void;
  onDelete: (id: StudentEducationalProgramId) => void;
};

const EditStudentEducationalProgramForm = ({
  studentEducationalPrograms,
  educationalPrograms,
  isPending,
  className,
  onAdd,
  onDelete,
  onDetails,
}: EditStudentEducationalProgramFormProps) => {
  const availableNewPrograms = useMemo(() => {
    return difference(educationalPrograms, studentEducationalPrograms);
  }, [educationalPrograms, studentEducationalPrograms]);

  const getProgramId = (studentProgram: StudentEducationalProgram) => {
    return String(studentProgram.id);
  };

  const getProgramName = (studentProgram: StudentEducationalProgram) => {
    return studentProgram.educationalProgram.name;
  };

  const onDeleteProgram = (studentProgram: StudentEducationalProgram) => {
    onDelete(studentProgram.id);
  };

  const onProgramDetails = (studentProgram: StudentEducationalProgram) => {
    onDetails(studentProgram.id);
  };

  return (
    <Root className={className}>
      <ProgramList>
        {studentEducationalPrograms.map((program) => (
          <ProgramListItem key={program.id}>
            <FormControl>
              <FieldLabel shrink htmlFor={getProgramId(program)}>
                Educational Program
              </FieldLabel>
              <FormTextField
                label="Educational program"
                id={getProgramId(program)}
                readOnly
                value={getProgramName(program)}
                endAdornment={
                  <ProgramActions position="end">
                    <ProgramInfo
                      disabled={isPending}
                      onClick={() => onProgramDetails(program)}
                    >
                      Program info
                    </ProgramInfo>
                    <ProgramDelete
                      disabled={isPending}
                      onClick={() => onDeleteProgram(program)}
                    >
                      Delete program
                    </ProgramDelete>
                  </ProgramActions>
                }
              />
            </FormControl>
          </ProgramListItem>
        ))}
      </ProgramList>
      <Condition.When condition={!!availableNewPrograms.length}>
        <Actions>
          <SaveButton type="button" onClick={onAdd}>
            Add educational program
          </SaveButton>
        </Actions>
      </Condition.When>
    </Root>
  );
};

export default EditStudentEducationalProgramForm;
