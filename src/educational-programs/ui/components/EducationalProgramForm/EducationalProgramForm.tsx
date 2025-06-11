import { Actions, Form, FormControl } from './styles';
import { BackButton, FormTextField, SaveButton } from '@/common/ui/components';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators.ts';
import { Controller, useForm } from 'react-hook-form';
import {
  EducationalProgram,
  academicDegrees,
  studyFormats,
} from '@/educational-programs/entities';
import StudyFormat from '../StudyFormat';
import AcademicDegree from '../AcademicDegree';

export type EducationalProgramFormProps = {
  data?: EducationalProgram;
  isPending: boolean;
  onSubmit: (data: EducationalProgram) => void;
  onBack: () => void;
};

const EducationalProgramForm = ({
  isPending,
  data,
  onSubmit,
  onBack,
}: EducationalProgramFormProps) => {
  const { register, handleSubmit, formState, control } = useForm<{
    id: number;
    name: string;
    degreeType: string;
    studyFormat: string;
  }>({
    mode: 'onChange',
    values: data,
  });

  const { isValid } = formState;

  const onSave = (values: EducationalProgram) => {
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit(onSave)}>
      <FormControl>
        <InputLabel shrink htmlFor="educational-program-name">
          Name
        </InputLabel>
        <FormTextField
          label="name"
          {...register('name', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="educational-program-degree-type">
          Degree Type
        </InputLabel>
        <Controller
          name="degreeType"
          control={control}
          rules={{ ...requiredValidator() }}
          render={({ field }) => (
            <Select notched label="degree-type" {...field}>
              {academicDegrees.map((degree) => (
                <MenuItem key={degree} value={degree}>
                  <AcademicDegree value={degree} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="educational-program-study-format">
          Study Format
        </InputLabel>
        <Controller
          name="studyFormat"
          control={control}
          rules={{ ...requiredValidator() }}
          render={({ field }) => (
            <Select notched label="study-format" {...field}>
              {studyFormats.map((format) => (
                <MenuItem key={format} value={format}>
                  <StudyFormat value={format} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <Actions>
        <BackButton onClick={onBack} />
        <SaveButton loading={isPending} disabled={!isValid} type="submit" />
      </Actions>
    </Form>
  );
};

export default EducationalProgramForm;
