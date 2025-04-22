import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { Controller, useForm } from 'react-hook-form';
import { GrouppedData } from '@/common/entities'
import { Subject, subjectTypes, subjectActivities } from '@/subjects/entities';
import { InputLabel, MenuItem, Select } from '@mui/material';
import {
  requiredValidator,
} from '@/common/utils/validators.ts';
import {
  SubjectType,
  SubjectActivity,
} from '@/subjects/ui/components';
import { useCallback, useEffect, useMemo } from 'react';
import { useSubjectsExecute } from '@/subjects/hooks';

type GrouppedSubjectData = GrouppedData<Subject["term"], Subject["subject"], Subject["subjectActivity"]>;

export type EditSubjectModalProps = {
  open: boolean;
  mode?: 'edit' | 'add';
  subject?: GrouppedSubjectData;
  onClose: () => void;
};

const SubjectModal = ({
  open,
  mode: modalMode,
  subject,
  onClose,
}: EditSubjectModalProps) => {
  const values = useMemo(() => ({
    term: subject?.data1,
    subject: subject?.data2,
    subjectActivity: subject?.data3,
  }), [subject]);

  const {
    executeRequest: editSubject,
    isPending: isEditPending
  } = useSubjectsExecute<GrouppedSubjectData>({ serviceFunction: "editSubject", onSuccess: onClose });

  const {
    executeRequest: addSubject,
    isPending: isAddPending
  } = useSubjectsExecute<GrouppedSubjectData>({ serviceFunction: "addSubject", onSuccess: onClose });

  const { register, handleSubmit, formState, control, reset } = useForm<Subject>({
    mode: 'onChange',
    values: values && { ...values },
  });

  const onSubmit = async (values: Subject) => {
    if (modalMode === 'add') {
      return addSubject({
        data1: values.term,
        data2: values.subject,
        data3: values.subjectActivity,
      });
    }

    if (modalMode === 'edit') {
      return editSubject({
        data1: values.term,
        data2: values.subject,
        data3: values.subjectActivity,
      });
    }
  };

  const { isValid } = formState;

  const modalInfo = useMemo(() => {
    if (modalMode == 'edit' && values?.subjectActivity ||
      modalMode == 'add' && values?.subject) {
      return {
        type: 'subjectActivity',
        title: 'Subject Activity information',
      };
    }

    if (modalMode == 'edit' && values?.subject ||
      modalMode == 'add' && values?.term?.number && !values?.subject) {
      return {
        type: 'subject',
        title: 'Subject information',
      };
    }

    if (modalMode == 'edit' && values?.term ||
      modalMode == 'add' && !values?.term?.number) {
      return {
        type: 'term',
        title: 'Term information',
      };
    }
  }, [values, modalMode]);

  useEffect(() => {
    if (!open) {
      reset({ term: {} } as Subject);
    }
  }, [open, reset]);

  const TermForm = useCallback(() => (
    <>
      <FormControl>
        <InputLabel shrink htmlFor="term-number">
          Number
        </InputLabel>
        <FormTextField
          label="number"
          {...register('term.number', { ...requiredValidator() })}
        />
      </FormControl>
    </>
  ), [register]);

  const SubjectForm = useCallback(() => (
    <>
      <FormControl>
        <InputLabel shrink htmlFor="subject-name">
          Name
        </InputLabel>
        <FormTextField
          label="name"
          {...register('subject.name', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="subject-type">
          Type
        </InputLabel>
        <Controller
          name="subject.type"
          control={control}
          rules={{ ...requiredValidator() }}
          render={({ field }) => (
            <Select notched label="type" {...field}>
              {subjectTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <SubjectType value={type} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </>
  ), [register, control]);

  const SubjectActivityForm = useCallback(() => (
    <>
      <FormControl>
        <InputLabel shrink htmlFor="subject-activity-type">
          Type
        </InputLabel>
        <Controller
          name="subjectActivity.type"
          control={control}
          rules={{ ...requiredValidator() }}
          render={({ field }) => (
            <Select notched label="type" {...field}>
              {subjectActivities.map((activity) => (
                <MenuItem key={activity} value={activity}>
                  <SubjectActivity value={activity} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="subject-activity-academic-hours">
          Academic Hours
        </InputLabel>
        <FormTextField
          label="academicHours"
          {...register('subjectActivity.academicHours', { ...requiredValidator() })}
        />
      </FormControl>
    </>
  ), [register, control]);

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>{modalInfo?.title}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {modalInfo?.type === 'term' && <TermForm/>}

          {modalInfo?.type === 'subject' && <SubjectForm/>}

          {modalInfo?.type === 'subjectActivity' && <SubjectActivityForm/>}

          <Actions>
            <BackButton onClick={onClose} />
            <SaveButton loading={isEditPending || isAddPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default SubjectModal;
