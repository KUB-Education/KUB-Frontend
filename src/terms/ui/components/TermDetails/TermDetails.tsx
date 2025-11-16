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
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { EducationalProgram } from '@/educational-programs/entities';
import { EditTermParams, Term, termNumberValidator } from '@/terms/entities';
import { useDeleteTerms, useEditTerm } from '@/terms/hooks';

export type TermDetailsProps = {
  educationalProgram: EducationalProgram;
  term: Term;
  onBack: () => void;
  onSucceed: () => void;
  onDeleteSucceed: () => void;
};

type FormValues = Omit<EditTermParams, 'termId' | 'educationalProgramId'>;

const TermDetails = ({
  educationalProgram,
  term,
  onBack,
  onSucceed,
  onDeleteSucceed,
}: TermDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { ...term },
  });
  const {
    editTerm,
    isPending: isEditPending,
    error: editError,
  } = useEditTerm({ onSuccess: onSucceed, onError });
  const {
    deleteTerms,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeleteTerms({ onSuccess: onDeleteSucceed, onError });

  const isPending = useMemo(() => {
    return isDeletePending || isEditPending;
  }, [isEditPending, isDeletePending]);

  const error = useMemo(() => {
    const errors = [editError, deleteError].filter(Boolean);

    return errors[0];
  }, [editError, deleteError]);

  const onSubmit = async (values: FormValues) => {
    return editTerm({
      termId: term.id,
      educationalProgramId: term.id,
      ...values,
    });
  };

  const onDelete = () => {
    deleteTerms({
      educationalProgramId: educationalProgram.id,
      termIds: [term.id],
    });
  };

  const { isValid, isDirty } = formState;

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Term details</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="educationalProgram">
            Educational Program
          </FieldLabel>
          <FormTextField
            label="Educational Program"
            readOnly
            value={educationalProgram.name}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="number">
            Number
          </FieldLabel>
          <FormTextField
            label="Number"
            type="number"
            {...register('number', {
              ...termNumberValidator,
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

export default TermDetails;
