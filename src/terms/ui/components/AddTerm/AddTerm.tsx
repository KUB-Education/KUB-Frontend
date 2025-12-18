import {
  AddButton,
  BackButton,
  FormTextField,
  ErrorModal,
  FieldLabel,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AddTermParams, termNumberValidator } from '@/terms/entities';
import { EducationalProgramId } from '@/educational-programs/entities';
import { useAddTerm } from '@/terms/hooks';

export type AddTermProps = {
  educationalProgramId: EducationalProgramId;
  onBack: () => void;
  onSucceed: () => void;
};

type FormValues = Omit<AddTermParams, 'educationalProgramId'>;

const AddTerm = ({ educationalProgramId, onBack, onSucceed }: AddTermProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
  });
  const { addTerm, isPending, error } = useAddTerm({
    onSuccess: onSucceed,
    onError,
  });

  const onSubmit = async (values: FormValues) => {
    return addTerm({
      educationalProgramId: educationalProgramId,
      ...values,
    });
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new term</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="number">
            Number
          </FieldLabel>
          <FormTextField
            label="Number"
            type="number"
            {...register('number', {
              ...termNumberValidator,
              setValueAs: (value) => Number(value),
            })}
          />
        </FormControl>
        <Actions>
          <BackButton onClick={onBack} />
          <AddButton loading={isPending} disabled={!isValid} type="submit" />
        </Actions>
      </Form>

      <ErrorModal
        open={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        onContinue={() => setIsErrorModalVisible(false)}
      >
        {error?.message}
      </ErrorModal>
    </Content>
  );
};

export default AddTerm;
