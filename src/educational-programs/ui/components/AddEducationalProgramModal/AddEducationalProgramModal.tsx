import {
  Modal,
  AddButton,
  BackButton,
  FormTextField,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl, SubTitle } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { AddEducationalProgramParams } from '@/educational-programs/entities';
import { InputLabel } from '@mui/material';
import {
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useAddEducationalProgram } from '@/educational-programs/hooks';

export type AddEducationalProgramModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddEducationalProgramModal = ({ open, onClose }: AddEducationalProgramModalProps) => {
  const { addEducationalProgram, isPending } = useAddEducationalProgram({ onSuccess: onClose });
  const { register, handleSubmit, formState } = useForm<AddEducationalProgramParams>({
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
            <AddButton loading={isPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default AddEducationalProgramModal;
