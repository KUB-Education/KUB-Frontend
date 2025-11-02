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
import { useAddStudyFieldSpeciality } from '@/specialities/hooks';
import { AddStudyFieldSpecialityParams } from '@/specialities/entities';
import { StudyField } from '@/study-fields/entities';

export type AddSpecialityProps = {
  studyField: StudyField;
  onBack: () => void;
  onSucceed: () => void;
};

type FormValues = Omit<AddStudyFieldSpecialityParams, 'studyFieldId'>;

const AddSpeciality = ({
  studyField,
  onBack,
  onSucceed,
}: AddSpecialityProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
  });
  const { addSpeciality, isPending, error } = useAddStudyFieldSpeciality({
    onSuccess: onSucceed,
    onError,
  });

  const onSubmit = async (values: FormValues) => {
    return addSpeciality({
      studyFieldId: studyField.id,
      ...values,
    });
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new speciality</Title>
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

export default AddSpeciality;
