import {
  Form,
  FormControl,
  Root,
  ProgramActions,
  ProgramDelete,
  ProgramInfo,
  ProgramList,
  ProgramListItem,
  Actions,
} from './styles.tsx';
import { MenuItem, Select } from '@mui/material';
import {
  FieldLabel,
  FormTextField,
  SaveButton,
  Condition,
} from '@/common/ui/components';
import { Controller, useForm } from 'react-hook-form';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useMemo, useState } from 'react';
import { difference } from '@/common/utils';
import {
  EducationalProgram,
  EducationalProgramId,
} from '@/educational-programs/entities';

export type EditStudentEducationalProgramFormProps = {
  studentEducationalPrograms: Array<EducationalProgram>;
  educationalPrograms: Array<EducationalProgram>;
  isPending: boolean;
  className?: string;
  onAdd: (id: EducationalProgramId) => void;
  onDelete: (id: EducationalProgramId) => void;
};

const EditStudentEducationalProgramForm = ({
  studentEducationalPrograms,
  educationalPrograms,
  isPending,
  className,
  onAdd,
  onDelete,
}: EditStudentEducationalProgramFormProps) => {
  const [isNewProgramFormVisible, setIsNewProgramFormVisible] = useState(false);

  const { handleSubmit, formState, control, reset } = useForm<{
    newProgram: EducationalProgramId;
  }>({ mode: 'onChange' });

  const availableNewPrograms = useMemo(() => {
    return difference(educationalPrograms, studentEducationalPrograms);
  }, [educationalPrograms, studentEducationalPrograms]);

  const onSubmit = async (values: { newProgram: EducationalProgramId }) => {
    onAdd(values.newProgram);
    reset();
  };

  const getProgramId = (educationalProgram: EducationalProgram) => {
    return String(educationalProgram.educationalProgram.id);
  };

  const getProgramName = (educationalProgram: EducationalProgram) => {
    return educationalProgram.educationalProgram.name.toUpperCase();
  };

  const onDeleteProgram = (educationalProgram: EducationalProgram) => {
    onDelete(educationalProgram.id);
  };

  const { isValid } = formState;

  const isConfirmProgramDisabled = !isValid || isPending;

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
                    <ProgramInfo disabled={isPending}>Program info</ProgramInfo>
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
        <Condition.If condition={!isNewProgramFormVisible}>
          <Condition.Then>
            <Actions>
              <SaveButton
                type="button"
                onClick={() => setIsNewProgramFormVisible(true)}
              >
                Add educational program
              </SaveButton>
            </Actions>
          </Condition.Then>
          <Condition.Else>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FieldLabel htmlFor="newProgram">
                  New Educational Program
                </FieldLabel>
                <Controller
                  name="newProgram"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select label="New Educational Program" {...field}>
                      {availableNewPrograms.map((program) => (
                        <MenuItem
                          key={getProgramId(program)}
                          value={program.id}
                        >
                          {getProgramName(program)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Actions>
                <SaveButton type="submit" disabled={isConfirmProgramDisabled}>
                  Confirm
                </SaveButton>
              </Actions>
            </Form>
          </Condition.Else>
        </Condition.If>
      </Condition.When>
    </Root>
  );
};

export default EditStudentEducationalProgramForm;
