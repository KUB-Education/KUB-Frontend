import {
  Modal,
  AddButton,
  BackButton,
  FormTextField,
  FieldLabel,
} from '@/common/ui/components';
import {
  Content,
  Title,
  Actions,
  Form,
  FormControl,
  SubTitle,
} from './styles.tsx';
import { Controller, useForm } from 'react-hook-form';
import {
  AddEducationalProgramParams,
  academicDegrees,
  studyFormats,
} from '@/educational-programs/entities';
import { MenuItem, Select } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useAddEducationalProgram } from '@/educational-programs/hooks';
import {
  AcademicDegree,
  StudyFormat,
} from '@/educational-programs/ui/components';

export type AddEducationalProgramModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddEducationalProgramModal = ({
  open,
  onClose,
}: AddEducationalProgramModalProps) => {
  const { addEducationalProgram, isPending } = useAddEducationalProgram({
    onSuccess: onClose,
  });
  const { register, handleSubmit, formState, control } =
    useForm<AddEducationalProgramParams>({
      mode: 'onChange',
    });

  const onSubmit = async (values: AddEducationalProgramParams) => {
    return addEducationalProgram(values);
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Add new educational program</Title>

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
            <AddButton loading={isPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default AddEducationalProgramModal;
