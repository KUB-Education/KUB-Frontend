import { Actions, Form, FormControl } from './styles';
import { BackButton, FormTextField, SaveButton } from '@/common/ui/components';
import { InputLabel } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useForm } from 'react-hook-form';
import { StudyField } from '@/educational-programs/entities';

export type StudyFieldFormProps = {
  data?: StudyField;
  isPending: boolean;
  onSubmit: (data: StudyField) => void;
  onBack: () => void;
};

const StudyFieldForm = ({
  isPending,
  data,
  onSubmit,
  onBack,
}: StudyFieldFormProps) => {
  const { register, handleSubmit, formState } = useForm<StudyField>({
    mode: 'onChange',
    values: data,
  });

  const { isValid } = formState;

  const onSave = (values: StudyField) => {
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit(onSave)}>
      <FormControl>
        <InputLabel shrink htmlFor="study-field-code">
          Code
        </InputLabel>
        <FormTextField
          label="code"
          {...register('code', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="study-field-name">
          Name
        </InputLabel>
        <FormTextField
          label="name"
          {...register('name', { ...requiredValidator() })}
        />
      </FormControl>
      <Actions>
        <BackButton onClick={onBack} />
        <SaveButton loading={isPending} disabled={!isValid} type="submit" />
      </Actions>
    </Form>
  );
};

export default StudyFieldForm;
