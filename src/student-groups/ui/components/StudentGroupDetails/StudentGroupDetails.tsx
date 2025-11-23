import {
  BackButton,
  FormTextField,
  ErrorModal,
  FieldLabel,
  SaveButton,
} from '@/common/ui/components';
import {
  Content,
  Title,
  Actions,
  Form,
  FormControl,
  DeleteButton,
} from './styles';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { requiredValidator } from '@/common/utils/validators';
import {
  useDeleteStudentGroups,
} from '@/student-groups/hooks';
import {
  EditStudentGroupParams,
  StudentGroup,
} from '@/student-groups/entities';
import { getFormDirtyValues } from '@/common/utils';
import { useEditStudentGroup } from '@/student-groups/hooks';

export type StudentGruopDetailsProps = {
  studentGruop: StudentGroup;
  onBack: () => void;
  onSucceed: () => void;
  onDeleteSucceed: () => void;
};

type FormValues = Omit<EditStudentGroupParams, 'id'>;

const StudentGroupDetails = ({
  studentGruop,
  onBack,
  onSucceed,
  onDeleteSucceed,
}: StudentGruopDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState, } = useForm<FormValues>({
    mode: 'onChange',
    values: { ...studentGruop },
  });
  const { isValid, isDirty, dirtyFields } = formState;

  const {
    editStudentGroup,
    isPending: isEditPending,
    error: editError,
  } = useEditStudentGroup({
    onSuccess: onSucceed,
    onError,
  });
  const {
    deleteStudentGroups,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeleteStudentGroups({ onSuccess: onDeleteSucceed, onError });

  const isPending = useMemo(() => {
    return isDeletePending || isEditPending;
  }, [isEditPending, isDeletePending]);

  const error = useMemo(() => {
    const errors = [editError, deleteError].filter(Boolean);

    return errors[0];
  }, [editError, deleteError]);

  const onSubmit = async (values: FormValues) => {
    const updatedValues = getFormDirtyValues(values, dirtyFields);

    return editStudentGroup({
      id: studentGruop.id,
      ...updatedValues,
    });
  };

  const onDelete = () => {
    deleteStudentGroups([studentGruop.id]);
  };

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Student group information</Title>
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
        <Actions>
          <BackButton onClick={onBack} />
          <DeleteButton disabled={isPending} onClick={onDelete} />
          <SaveButton
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

export default StudentGroupDetails;
