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
import { requiredValidator } from '@/common/utils/validators';
import { useAddSpecialityEducationalProgram } from '@/educational-programs/hooks';
import {
  AddSpecialityEducationalProgram,
  degreeTypes,
  educationalProgramDurationValidator,
  studyForms,
} from '@/educational-programs/entities';
import { Speciality } from '@/specialities/entities';
import { MenuItem, Select } from '@mui/material';
import { DegreeType, StudyForm } from '@/educational-programs/ui/components';

export type AddEducationalProgramProps = {
  speciality: Speciality;
  onBack: () => void;
  onSucceed: () => void;
};

type FormValues = Omit<AddSpecialityEducationalProgram, 'specialityId'>;

const AddEducationalProgram = ({
  speciality,
  onBack,
  onSucceed,
}: AddEducationalProgramProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
  });
  const { addEducationalProgram, isPending, error } =
    useAddSpecialityEducationalProgram({
      onSuccess: onSucceed,
      onError,
    });

  const onSubmit = async (values: FormValues) => {
    return addEducationalProgram({
      specialityId: speciality.id,
      ...values,
    });
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add new study field</Title>
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
          <FieldLabel shrink htmlFor="duration">
            Duration
          </FieldLabel>
          <FormTextField
            label="Duration"
            type="number"
            {...register('duration', {
              ...educationalProgramDurationValidator,
            })}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="degreeType">
            Degree Type
          </FieldLabel>
          <Controller
            name="degreeType"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Degree Type" {...field}>
                {degreeTypes.map((degreeType) => (
                  <MenuItem key={degreeType} value={degreeType}>
                    <DegreeType value={degreeType} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="studyForm">
            Study Format
          </FieldLabel>
          <Controller
            name="studyForm"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Study From" {...field}>
                {studyForms.map((studyForm) => (
                  <MenuItem key={studyForm} value={studyForm}>
                    <StudyForm value={studyForm} />
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

export default AddEducationalProgram;
