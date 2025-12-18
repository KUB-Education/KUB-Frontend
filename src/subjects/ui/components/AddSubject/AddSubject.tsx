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
import { useAddSubject } from '@/subjects/hooks';
import { Term } from '@/terms/entities';
import { AddSubjectParams, subjectTypes } from '@/subjects/entities';
import { requiredValidator } from '@/common/utils/validators.ts';
import { MenuItem, Select } from '@mui/material';

export type AddSubjectProps = {
  term: Term;
  onBack: () => void;
  onSucceed: () => void;
};

type FormValues = Omit<AddSubjectParams, 'termId'>;

const AddSubject = ({ term, onBack, onSucceed }: AddSubjectProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
  });
  const { addSubject, isPending, error } = useAddSubject({
    onSuccess: onSucceed,
    onError,
  });

  const onSubmit = async (values: FormValues) => {
    return addSubject({
      termId: term.id,
      ...values,
    });
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new subject</Title>
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

export default AddSubject;
