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
} from './styles';
import { Controller, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { EditSubjectParams, Subject, subjectTypes } from '@/subjects/entities';
import { useEditSubject } from '@/subjects/hooks/useEditSubject.ts';
import { useDeleteSubjects } from '@/subjects/hooks';
import { Term } from '@/terms/entities';
import { requiredValidator } from '@/common/utils/validators.ts';
import { MenuItem, Select } from '@mui/material';
import { getFormDirtyValues } from '@/common/utils';

export type SubjectDetailsProps = {
  term: Term;
  subject: Subject;
  onBack: () => void;
  onSucceed: () => void;
  onDeleteSucceed: () => void;
};

type FormValues = Omit<EditSubjectParams, 'termId' | 'subjectId'>;

const SubjectDetails = ({
  subject,
  term,
  onBack,
  onSucceed,
  onDeleteSucceed,
}: SubjectDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { ...subject },
  });
  const { isValid, isDirty, dirtyFields } = formState;

  const {
    editSubject,
    isPending: isEditPending,
    error: editError,
  } = useEditSubject({ onSuccess: onSucceed, onError });
  const {
    deleteSubjects,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeleteSubjects({ onSuccess: onDeleteSucceed, onError });

  const isPending = useMemo(() => {
    return isDeletePending || isEditPending;
  }, [isEditPending, isDeletePending]);

  const error = useMemo(() => {
    const errors = [editError, deleteError].filter(Boolean);

    return errors[0];
  }, [editError, deleteError]);

  const onSubmit = async (values: FormValues) => {
    const updatedValues = getFormDirtyValues(values, dirtyFields);

    return editSubject({
      termId: term.id,
      subjectId: subject.id,
      ...updatedValues,
    });
  };

  const onDelete = () => {
    deleteSubjects({
      termId: term.id,
      subjectIds: [subject.id],
    });
  };

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Subject details</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="name">
            Name
          </FieldLabel>
          <FormTextField
            label="Name"
            {...register('name', { ...requiredValidator() })}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="type">
            Type
          </FieldLabel>
          <Controller
            name="type"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Type" {...field}>
                {subjectTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            )}
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

export default SubjectDetails;
