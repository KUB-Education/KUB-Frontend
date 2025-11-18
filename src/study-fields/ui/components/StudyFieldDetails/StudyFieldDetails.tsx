import {
  AddButton,
  BackButton,
  FormTextField,
  ErrorModal,
  FieldLabel,
} from '@/common/ui/components';
import {
  Content,
  Title,
  Actions,
  Form,
  FormControl,
  DeleteButton,
} from './styles.tsx';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { requiredValidator } from '@/common/utils/validators';
import { EditStudyFieldParams, StudyField } from '@/study-fields/entities';
import { useDeleteStudyFields, useEditStudyField } from '@/study-fields/hooks';

export type StudyFieldDetailsProps = {
  studyField: StudyField;
  onBack: () => void;
  onSucceed: () => void;
  onDeleteSucceed: () => void;
};

type FormValues = Omit<EditStudyFieldParams, 'id'>;

const StudyFieldDetails = ({
  studyField,
  onBack,
  onSucceed,
  onDeleteSucceed,
}: StudyFieldDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { name: studyField.name, code: studyField.code },
  });
  const {
    editStudyField,
    isPending: isEditPending,
    error: editError,
  } = useEditStudyField({ onSuccess: onSucceed, onError });
  const {
    deleteStudyFields,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeleteStudyFields({ onSuccess: onDeleteSucceed, onError });

  const isPending = useMemo(() => {
    return isDeletePending || isEditPending;
  }, [isEditPending, isDeletePending]);

  const error = useMemo(() => {
    const errors = [editError, deleteError].filter(Boolean);

    return errors[0];
  }, [editError, deleteError]);

  const onSubmit = async (values: FormValues) => {
    return editStudyField({
      id: studyField.id,
      ...values,
    });
  };

  const onDelete = () => {
    deleteStudyFields([studyField.id]);
  };

  const { isValid, isDirty } = formState;

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Study field information</Title>
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
          <DeleteButton disabled={isPending} onClick={onDelete} />
          <AddButton
            loading={isPending}
            disabled={isConfirmDisabled}
            type="submit"
          />
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

export default StudyFieldDetails;
