import {
  Form,
  FormControl,
  Root,
  TitleList,
  TitleActions,
  TitleListItem,
  TitleDelete,
  Actions,
} from './styles.tsx';
import { MenuItem, Select } from '@mui/material';
import {
  FieldLabel,
  FormTextField,
  SaveButton,
  Condition,
} from '@/common/ui/components';
import { Controller, useForm } from 'react-hook-form';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useMemo, useState } from 'react';
import {
  AcademicTitle,
  AcademicTitleId,
  getAvailableAcademicTitles,
  Lecturer,
} from '@/lecturers/entities';

export type EditAcademicsTitleProps = {
  lecturer: Lecturer;
  academicTitles: Array<AcademicTitle>;
  isPending: boolean;
  className?: string;
  onAdd: (id: AcademicTitleId) => void;
  onDelete: (id: AcademicTitleId) => void;
};

const EditAcademicTitles = ({
  lecturer,
  academicTitles,
  isPending,
  className,
  onAdd,
  onDelete,
}: EditAcademicsTitleProps) => {
  const [isNewTitleFormVisible, setIsNewTitleFormVisible] = useState(false);

  const { handleSubmit, formState, control, reset } = useForm<{
    newAcademicTitle: AcademicTitleId;
  }>({ mode: 'onChange' });

  const availableNewTitles = useMemo(() => {
    return getAvailableAcademicTitles(lecturer, academicTitles);
  }, [academicTitles, lecturer]);

  const onSubmit = async (values: { newAcademicTitle: AcademicTitleId }) => {
    onAdd(values.newAcademicTitle);
    reset();
  };

  const onDeleteTitle = (title: AcademicTitle) => {
    onDelete(title.id);
  };

  const { isValid } = formState;

  const isConfirmTitleDisabled = !isValid || isPending;

  return (
    <Root className={className}>
      <TitleList>
        {lecturer.academicTitles.map((title) => (
          <TitleListItem key={title.id}>
            <FormControl>
              <FieldLabel shrink htmlFor={String(title.id)}>
                Academic title
              </FieldLabel>
              <FormTextField
                label="Academic title"
                id={String(title.id)}
                readOnly
                value={title.name}
                endAdornment={
                  <TitleActions position="end">
                    <TitleDelete
                      disabled={isPending}
                      onClick={() => onDeleteTitle(title)}
                    >
                      Delete
                    </TitleDelete>
                  </TitleActions>
                }
              />
            </FormControl>
          </TitleListItem>
        ))}
      </TitleList>
      <Condition.When condition={!!availableNewTitles.length}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Condition.If condition={!isNewTitleFormVisible}>
            <Condition.Then>
              <Actions>
                <SaveButton
                  type="button"
                  onClick={() => setIsNewTitleFormVisible(true)}
                >
                  Add academic title
                </SaveButton>
              </Actions>
            </Condition.Then>
            <Condition.Else>
              <FormControl>
                <FieldLabel htmlFor="newAcademicTitle">
                  Academic title
                </FieldLabel>
                <Controller
                  name="newAcademicTitle"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select label="New Academic title" {...field}>
                      {availableNewTitles.map((title) => (
                        <MenuItem key={title.id} value={title.id}>
                          {title.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Actions>
                <SaveButton type="submit" disabled={isConfirmTitleDisabled}>
                  Confirm
                </SaveButton>
              </Actions>
            </Condition.Else>
          </Condition.If>
        </Form>
      </Condition.When>
    </Root>
  );
};

export default EditAcademicTitles;
