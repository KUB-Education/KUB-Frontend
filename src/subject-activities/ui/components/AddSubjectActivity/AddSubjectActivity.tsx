import {
  AddButton,
  BackButton,
  FormTextField,
  ErrorModal,
  FieldLabel,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Subject } from '@/subjects/entities';
import { requiredValidator } from '@/common/utils/validators.ts';
import { MenuItem, Select } from '@mui/material';
import {
  academicHoursValidator,
  AddSubjectActivityParams,
  subjectActivityTypes,
} from '@/subject-activities/entities';
import { useAddSubjectActivity } from '@/subject-activities/hooks';

export type AddSubjectActivityProps = {
  subject: Subject;
  onBack: () => void;
  onSucceed: () => void;
};

type FormValues = Omit<AddSubjectActivityParams, 'subjectId'>;

const AddSubjectActivity = ({
  subject,
  onBack,
  onSucceed,
}: AddSubjectActivityProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
  });
  const { addSubjectActivity, isPending, error } = useAddSubjectActivity({
    onSuccess: onSucceed,
    onError,
  });

  const onSubmit = async (values: FormValues) => {
    return addSubjectActivity({
      subjectId: subject.id,
      ...values,
    });
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new subject activity</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

export default AddSubjectActivity;
