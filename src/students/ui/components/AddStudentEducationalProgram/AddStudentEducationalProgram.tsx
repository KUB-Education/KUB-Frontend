import {
  AddButton,
  BackButton,
  FieldLabel,
  DatePicker,
  DatePickerValue,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { Controller, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { requiredValidator } from '@/common/utils/validators.ts';
import {
  AddStudentEducationalProgramParams,
  Student,
  StudentEducationalProgramTuition,
  studentEducationalProgramTuitions,
} from '@/students/entities';
import {
  EducationalProgram,
  EducationalProgramId,
} from '@/educational-programs/entities';
import { MenuItem, Select } from '@mui/material';
import { createDate, difference } from '@/common/utils';

export type AddStudentEducationalProgramProps = {
  student: Student;
  educationalPrograms: EducationalProgram[];
  isPending: boolean;
  onAdd: (params: AddStudentEducationalProgramParams) => void;
  onBack: () => void;
};

type FormValues = {
  educationalProgramId: EducationalProgramId;
  startDate: DatePickerValue;
  tuition: StudentEducationalProgramTuition;
};

const AddStudentEducationalProgram = ({
  student,
  educationalPrograms,
  isPending,
  onAdd,
  onBack,
}: AddStudentEducationalProgramProps) => {
  const { handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { startDate: createDate() },
  });

  const onSubmit = async (values: FormValues) => {
    return onAdd({
      studentId: student.id,
      educationalProgramId: values.educationalProgramId,
      startDate: values.startDate.toDate().getTime(),
      tuition: values.tuition,
    });
  };

  const availableNewPrograms = useMemo(() => {
    return difference(educationalPrograms, student.educationalPrograms);
  }, [educationalPrograms, student.educationalPrograms]);

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add student educational program</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="educationalProgramId">
            Educational Program
          </FieldLabel>
          <Controller
            name="educationalProgramId"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Educational program" {...field}>
                {availableNewPrograms.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl>
          <Controller
            name="startDate"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => <DatePicker label="Start Date" {...field} />}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="tuition">
            Tuition
          </FieldLabel>
          <Controller
            name="tuition"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Tuition" {...field}>
                {studentEducationalProgramTuitions.map((tuition) => (
                  <MenuItem key={tuition} value={tuition}>
                    {tuition}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Actions>
          <BackButton onClick={onBack} />
          <AddButton loading={isPending} disabled={!isValid} type="submit" />
        </Actions>
      </Form>
    </Content>
  );
};

export default AddStudentEducationalProgram;
