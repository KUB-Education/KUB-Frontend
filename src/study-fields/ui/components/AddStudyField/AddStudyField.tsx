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
import { requiredValidator } from '@/common/utils/validators';
import { AddStudyFieldParams } from '@/study-fields/entities';
import { useAddStudyField } from '@/study-fields/hooks';

export type AddStudyFieldProps = {
  onBack: () => void;
  onSucceed: () => void;
};

const AddStudyField = ({ onBack, onSucceed }: AddStudyFieldProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<AddStudyFieldParams>({
    mode: 'onChange',
  });
  const { addStudyField, isPending, error } = useAddStudyField({
    onSuccess: onSucceed,
    onError,
  });

  const onSubmit = async (values: AddStudyFieldParams) => {
    return addStudyField(values);
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new study field</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="code">
            Code
          </FieldLabel>
          <FormTextField
            label="Code"
            {...register('code', { ...requiredValidator() })}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="name">
            Name
          </FieldLabel>
          <FormTextField
            label="Name"
            {...register('name', { ...requiredValidator() })}
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

export default AddStudyField;
