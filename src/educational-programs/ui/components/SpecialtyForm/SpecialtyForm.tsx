import { Actions, Form, FormControl } from './styles';
import { BackButton, FormTextField, SaveButton } from '@/common/ui/components';
import { InputLabel } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useForm } from 'react-hook-form';
import { Specialty } from '@/educational-programs/entities';

export type SpecialtyProps = {
  data?: Specialty;
  isPending: boolean;
  onSubmit: (data: Specialty) => void;
  onBack: () => void;
};

const SpecialtyForm = ({
  isPending,
  data,
  onSubmit,
  onBack,
}: SpecialtyProps) => {
  const { register, handleSubmit, formState } = useForm<Specialty>({
    mode: 'onChange',
    values: data,
  });

  const { isValid } = formState;

  const onSave = (values: Specialty) => {
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit(onSave)}>
      <FormControl>
        <InputLabel shrink htmlFor="specialty-code">
          Code
        </InputLabel>
        <FormTextField
          label="code"
          {...register('code', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="specialty-name">
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

export default SpecialtyForm;
