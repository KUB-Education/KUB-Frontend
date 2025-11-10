import {
  AddButton,
  BackButton,
  FieldLabel,
  DatePicker,
  DatePickerValue,
  FormTextField,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { requiredValidator } from '@/common/utils/validators';
import {
  Student,
  StudentEducationalProgram,
  StudentEducationalProgramStatus,
  studentEducationalProgramStatuses,
  StudentEducationalProgramTuition,
  studentEducationalProgramTuitions,
  EditStudentEducationalProgramParams,
} from '@/students/entities';
import { MenuItem, Select } from '@mui/material';
import { createDate, getFormDirtyValues } from '@/common/utils';

export type StudentEducationalProgramDetailsProps = {
  student: Student;
  studentEducationalProgram: StudentEducationalProgram;
  isPending: boolean;
  onEdit: (params: EditStudentEducationalProgramParams) => void;
  onBack: () => void;
};

type FormValues = {
  startDate: DatePickerValue;
  endDate: DatePickerValue;
  tuition: StudentEducationalProgramTuition;
  status: StudentEducationalProgramStatus;
};

const StudentEducationalProgramDetails = ({
  student,
  studentEducationalProgram,
  isPending,
  onEdit,
  onBack,
}: StudentEducationalProgramDetailsProps) => {
  const { handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      tuition: studentEducationalProgram.tuition,
      startDate: createDate(studentEducationalProgram.startDate),
      endDate: createDate(studentEducationalProgram.endDate),
      status: studentEducationalProgram.status,
    },
  });
  const { isValid, dirtyFields, isDirty } = formState;

  const onSubmit = async (values: FormValues) => {
    const updatedValues = getFormDirtyValues(
      {
        ...values,
        startDate: values.startDate.toDate().getTime(),
        endDate: values.startDate.toDate().getTime(),
      },
      dirtyFields,
    );

    return onEdit({
      studentId: student.id,
      studentEducationalProgramId: studentEducationalProgram.id,
      ...updatedValues,
    });
  };

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Student educational program details</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="educationalProgramId">
            Educational Program
          </FieldLabel>
          <FormTextField
            label="Educational Program"
            id="department"
            readOnly
            value={studentEducationalProgram.educationalProgram.name}
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
          <Controller
            name="endDate"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <DatePicker label="Finish Date" {...field} />
            )}
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
        <FormControl>
          <FieldLabel shrink htmlFor="status">
            Status
          </FieldLabel>
          <Controller
            name="status"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Status" {...field}>
                {studentEducationalProgramStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Actions>
          <BackButton onClick={onBack} />
          <AddButton
            loading={isPending}
            disabled={isConfirmDisabled}
            type="submit"
          />
        </Actions>
      </Form>
    </Content>
  );
};

export default StudentEducationalProgramDetails;
