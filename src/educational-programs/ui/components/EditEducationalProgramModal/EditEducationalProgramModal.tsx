import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { EditEducationalProgramParams, EducationalProgram } from '@/educational-programs/entities';
import { InputLabel } from '@mui/material';
import {
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useEditEducationalProgram } from '@/educational-programs/hooks';
import { SubTitle } from '../AddEducationalProgramModal/styles.tsx';

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
  const { editEducationalProgram, isPending } = useEditEducationalProgram({ onSuccess: onClose });

  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values: {...educationalProgram},
  });

  const onSubmit = async (values: Inputs) => {
    return editEducationalProgram({ ...values, id: educationalProgram.id });
  };

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Room information</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <SubTitle>Study Field</SubTitle>
          <FormControl>
            <InputLabel shrink htmlFor="study-field-code">
              Code
            </InputLabel>
            <FormTextField
              label="code"
              {...register('studyField.code', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="study-field-name">
              Name
            </InputLabel>
            <FormTextField
              label="name"
              {...register('studyField.name', { ...requiredValidator() })}
            />
          </FormControl>

          <SubTitle>Speciality</SubTitle>
          <FormControl>
            <InputLabel shrink htmlFor="specialty-code">
              Code
            </InputLabel>
            <FormTextField
              label="code"
              {...register('specialty.code', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="specialty-name">
              Name
            </InputLabel>
            <FormTextField
              label="name"
              {...register('specialty.name', { ...requiredValidator() })}
            />
          </FormControl>

          <SubTitle>Educational Program</SubTitle>
          <FormControl>
            <InputLabel shrink htmlFor="educational-program-name">
              Name
            </InputLabel>
            <FormTextField
              label="name"
              {...register('educationalProgram.name', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="educational-program-degree-type">
              Degree Type
            </InputLabel>
            <FormTextField
              label="degree-type"
              {...register('educationalProgram.degreeType', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="educational-program-study-format">
              Study Format
            </InputLabel>
            <FormTextField
              label="study-format"
              {...register('educationalProgram.studyFormat', { ...requiredValidator() })}
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
