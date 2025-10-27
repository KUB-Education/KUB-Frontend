import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
  FieldLabel,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { Controller, useForm } from 'react-hook-form';
import {
  EditEducationalProgramParams,
  EducationalProgram,
  academicDegrees,
  studyFormats,
} from '@/educational-programs/entities';
import { MenuItem, Select } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useEditEducationalProgram } from '@/educational-programs/hooks';
import { SubTitle } from '../AddEducationalProgramModal/styles.tsx';
import {
  AcademicDegree,
  StudyFormat,
} from '@/educational-programs/ui/components';

export type EditEducationalProgramModalProps = {
  open: boolean;
  educationalProgram: EducationalProgram;
  onClose: () => void;
};

type Inputs = Omit<EditEducationalProgramParams, 'id'>;

const EditEducationalProgramModal = ({
  open,
  onClose,
  educationalProgram,
}: EditEducationalProgramModalProps) => {
  const { editEducationalProgram, isPending } = useEditEducationalProgram({
    onSuccess: onClose,
  });

  const { register, handleSubmit, formState, control } = useForm<Inputs>({
    mode: 'onChange',
    values: { ...educationalProgram },
  });

  const onSubmit = async (values: Inputs) => {
    return editEducationalProgram({ ...values, id: educationalProgram.id });
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Educational program information</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <SubTitle>Study Field</SubTitle>
          <FormControl>
            <FieldLabel shrink htmlFor="study-field-code">
              Code
            </FieldLabel>
            <FormTextField
              label="code"
              {...register('studyField.code', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <FieldLabel shrink htmlFor="study-field-name">
              Name
            </FieldLabel>
            <FormTextField
              label="name"
              {...register('studyField.name', { ...requiredValidator() })}
            />
          </FormControl>

          <SubTitle>Speciality</SubTitle>
          <FormControl>
            <FieldLabel shrink htmlFor="specialty-code">
              Code
            </FieldLabel>
            <FormTextField
              label="code"
              {...register('specialty.code', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <FieldLabel shrink htmlFor="specialty-name">
              Name
            </FieldLabel>
            <FormTextField
              label="name"
              {...register('specialty.name', { ...requiredValidator() })}
            />
          </FormControl>

          <SubTitle>Educational Program</SubTitle>
          <FormControl>
            <FieldLabel shrink htmlFor="educational-program-name">
              Name
            </FieldLabel>
            <FormTextField
              label="name"
              {...register('educationalProgram.name', {
                ...requiredValidator(),
              })}
            />
          </FormControl>
          <FormControl>
            <FieldLabel shrink htmlFor="educational-program-degree-type">
              Degree Type
            </FieldLabel>
            <Controller
              name="educationalProgram.degreeType"
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
            <FieldLabel shrink htmlFor="educational-program-study-format">
              Study Format
            </FieldLabel>
            <Controller
              name="educationalProgram.studyFormat"
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
            <BackButton onClick={onClose} />
            <SaveButton loading={isPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default EditEducationalProgramModal;
