import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
} from '@/common/ui/components';
import { Content, Title, Actions, Form, FormControl } from './styles.tsx';
import { Controller, useForm } from 'react-hook-form';
import { GrouppedData } from '@/common/entities'
import { academicDegrees, EducationalProgram, studyFormats } from '@/educational-programs/entities';
import { InputLabel, MenuItem, Select } from '@mui/material';
import {
  requiredValidator,
} from '@/common/utils/validators.ts';
import {
  AcademicDegree,
  StudyFormat,
} from '@/educational-programs/ui/components';
import { useCallback, useEffect, useMemo } from 'react';
import { useEducationalProgramsExecute } from '@/educational-programs/hooks/index.ts';

type GrouppedEPData = GrouppedData<EducationalProgram["studyField"], EducationalProgram["specialty"], EducationalProgram["educationalProgram"]>;

export type EditEducationalProgramModalProps = {
  open: boolean;
  mode?: 'edit' | 'add';
  educationalProgram?: GrouppedEPData;
  onClose: () => void;
};

const EducationalProgramModal = ({
  open,
  mode: modalMode,
  educationalProgram,
  onClose,
}: EditEducationalProgramModalProps) => {
  const values = useMemo(() => ({
    studyField: educationalProgram?.data1,
    specialty: educationalProgram?.data2,
    educationalProgram: educationalProgram?.data3,
  }), [educationalProgram]);

  const {
    executeRequest: editEducationalProgram,
    isPending: isEditPending
  } = useEducationalProgramsExecute<GrouppedEPData>({ serviceFunction: "editEducationalProgram", onSuccess: onClose });

  const {
    executeRequest: addEducationalProgram,
    isPending: isAddPending
  } = useEducationalProgramsExecute<GrouppedEPData>({ serviceFunction: "addEducationalProgram", onSuccess: onClose });

  const { register, handleSubmit, formState, control, reset, } = useForm<EducationalProgram>({
    mode: 'onChange',
    values: values && { ...values },
  });

  const onSubmit = async (values: EducationalProgram) => {
    if (modalMode === 'add') {
      return addEducationalProgram({
        data1: values.studyField,
        data2: values.specialty,
        data3: values.educationalProgram,
      });
    }

    if (modalMode === 'edit') {
      return editEducationalProgram({
        data1: values.studyField,
        data2: values.specialty,
        data3: values.educationalProgram,
      });
    }
  };

  const { isValid } = formState;

  const modalInfo = useMemo(() => {
    if (modalMode == 'edit' && values?.educationalProgram ||
      modalMode == 'add' && values?.specialty) {
      return {
        type: 'educationalProgram',
        title: 'Educational program information',
      };
    }

    if (modalMode == 'edit' && values?.specialty ||
      modalMode == 'add' && values?.studyField?.code && !values?.specialty) {
      return {
        type: 'specialty',
        title: 'Specialty information',
      };
    }

    if (modalMode == 'edit' && values?.studyField ||
      modalMode == 'add' && !values?.studyField?.code) {
      return {
        type: 'studyField',
        title: 'Study field information',
      };
    }
  }, [values, modalMode]);

  useEffect(() => {
    if (!open) {
      reset({ studyField: {} } as EducationalProgram);
    }
  }, [open, reset]);

  const StudyFieldForm = useCallback(() => (
    <>
      <FormControl>
        <InputLabel shrink htmlFor="study-field-code">
          Code
        </InputLabel>
        <FormTextField
          label="code"
          {...register('studyField.code', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="study-field-name">
          Name
        </InputLabel>
        <FormTextField
          label="name"
          {...register('studyField.name', { ...requiredValidator() })}
        />
      </FormControl>
    </>
  ), [register]);

  const SpecialtyForm = useCallback(() => (
    <>
      <FormControl>
        <InputLabel shrink htmlFor="specialty-code">
          Code
        </InputLabel>
        <FormTextField
          label="code"
          {...register('specialty.code', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="specialty-name">
          Name
        </InputLabel>
        <FormTextField
          label="name"
          {...register('specialty.name', { ...requiredValidator() })}
        />
      </FormControl>
    </>
  ), [register]);

  const EducationalProgramForm = useCallback(() => (
    <>
      <FormControl>
        <InputLabel shrink htmlFor="educational-program-name">
          Name
        </InputLabel>
        <FormTextField
          label="name"
          {...register('educationalProgram.name', { ...requiredValidator() })}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="educational-program-degree-type">
          Degree Type
        </InputLabel>
        <Controller
          name="educationalProgram.degreeType"
          control={control}
          rules={{ ...requiredValidator() }}
          render={({ field }) => (
            <Select notched label="degree-type" {...field}>
              {academicDegrees.map((degree) => (
                <MenuItem key={degree} value={degree}>
                  <AcademicDegree value={degree} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="educational-program-study-format">
          Study Format
        </InputLabel>
        <Controller
          name="educationalProgram.studyFormat"
          control={control}
          rules={{ ...requiredValidator() }}
          render={({ field }) => (
            <Select notched label="study-format" {...field}>
              {studyFormats.map((format) => (
                <MenuItem key={format} value={format}>
                  <StudyFormat value={format} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </>
  ), [register, control]);

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>{modalInfo?.title}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {modalInfo?.type === 'studyField' && <StudyFieldForm/>}

          {modalInfo?.type === 'specialty' && <SpecialtyForm/>}

          {modalInfo?.type === 'educationalProgram' && <EducationalProgramForm/>}

          <Actions>
            <BackButton onClick={onClose} />
            <SaveButton loading={isEditPending || isAddPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default EducationalProgramModal;
