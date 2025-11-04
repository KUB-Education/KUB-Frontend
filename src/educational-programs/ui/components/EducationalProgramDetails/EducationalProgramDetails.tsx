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
import { requiredValidator } from '@/common/utils/validators';
import {
  useDeleteEducationalPrograms,
  useEditEducationalProgram,
} from '@/educational-programs/hooks';
import {
  EditEducationalProgramParams,
  degreeTypes,
  EducationalProgram,
  educationalProgramDurationValidator,
  studyForms,
} from '@/educational-programs/entities';
import { MenuItem, Select } from '@mui/material';
import { DegreeType, StudyForm } from '@/educational-programs/ui/components';
import { Speciality } from '@/specialities/entities';
import { getFormDirtyValues } from '@/common/utils';

export type EducationalProgramDetailsProps = {
  educationalProgram: EducationalProgram;
  specialities: Speciality[];
  onBack: () => void;
  onSucceed: () => void;
  onDeleteSucceed: () => void;
};

type FormValues = Omit<EditEducationalProgramParams, 'id'>;

const EducationalProgramDetails = ({
  educationalProgram,
  specialities = [],
  onBack,
  onSucceed,
  onDeleteSucceed,
}: EducationalProgramDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    mode: 'onChange',
    values: { ...educationalProgram },
  });
  const { isValid, isDirty, dirtyFields } = formState;

  const {
    editEducationalProgram,
    isPending: isEditPending,
    error: editError,
  } = useEditEducationalProgram({
    onSuccess: onSucceed,
    onError,
  });
  const {
    deleteEducationalPrograms,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeleteEducationalPrograms({ onSuccess: onDeleteSucceed, onError });

  const isPending = useMemo(() => {
    return isDeletePending || isEditPending;
  }, [isEditPending, isDeletePending]);

  const error = useMemo(() => {
    const errors = [editError, deleteError].filter(Boolean);

    return errors[0];
  }, [editError, deleteError]);

  const onSubmit = async (values: FormValues) => {
    const updatedValues = getFormDirtyValues(values, dirtyFields);

    return editEducationalProgram({
      id: educationalProgram.id,
      ...updatedValues,
    });
  };

  const onDelete = () => {
    deleteEducationalPrograms([educationalProgram.id]);
  };

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Educational program information</Title>
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
          <FieldLabel shrink htmlFor="degreeType">
            Speciality
          </FieldLabel>
          <Controller
            name="specialityId"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Speciality" {...field}>
                {specialities.map((speciality) => (
                  <MenuItem key={speciality.id} value={speciality.id}>
                    {speciality.name}
                  </MenuItem>
                ))}
              </Select>
            )}
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

export default EducationalProgramDetails;
