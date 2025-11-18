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
import { Subject } from '@/subjects/entities';
import { requiredValidator } from '@/common/utils/validators.ts';
import { MenuItem, Select } from '@mui/material';
import { getFormDirtyValues } from '@/common/utils';
import {
  academicHoursValidator,
  EditSubjectActivityParams,
  SubjectActivity,
  subjectActivityTypes,
} from '@/subject-activities/entities';
import {
  useDeleteSubjectActivities,
  useEditSubjectActivity,
} from '@/subject-activities/hooks';

export type SubjectActivityDetailsProps = {
  subject: Subject;
  subjectActivity: SubjectActivity;
  onBack: () => void;
  onSucceed: () => void;
  onDeleteSucceed: () => void;
};

type FormValues = Omit<
  EditSubjectActivityParams,
  'subjectActivityId' | 'subjectId'
>;

const SubjectActivityDetails = ({
  subject,
  subjectActivity,
  onBack,
  onSucceed,
  onDeleteSucceed,
}: SubjectActivityDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { ...subjectActivity },
  });
  const { isValid, isDirty, dirtyFields } = formState;

  const {
    editSubjectActivity,
    isPending: isEditPending,
    error: editError,
  } = useEditSubjectActivity({ onSuccess: onSucceed, onError });
  const {
    deleteSubjectActivities,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeleteSubjectActivities({ onSuccess: onDeleteSucceed, onError });

  const isPending = useMemo(() => {
    return isDeletePending || isEditPending;
  }, [isEditPending, isDeletePending]);

  const error = useMemo(() => {
    const errors = [editError, deleteError].filter(Boolean);

    return errors[0];
  }, [editError, deleteError]);

  const onSubmit = async (values: FormValues) => {
    const updatedValues = getFormDirtyValues(values, dirtyFields);

    return editSubjectActivity({
      subjectActivityId: subjectActivity.id,
      subjectId: subject.id,
      ...updatedValues,
    });
  };

  const onDelete = () => {
    deleteSubjectActivities({
      subjectId: subject.id,
      subjectActivityIds: [subjectActivity.id],
    });
  };

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Subject activity details</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="subject">
            Subject
          </FieldLabel>
          <FormTextField
            label="Subject"
            id="subject"
            readOnly
            value={subject.name}
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
                {subjectActivityTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="academicHours">
            Academic Hours
          </FieldLabel>
          <FormTextField
            label="Academic Hours"
            type="number"
            {...register('academicHours', {
              ...academicHoursValidator,
              setValueAs: (value) => Number(value),
            })}
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

export default SubjectActivityDetails;
