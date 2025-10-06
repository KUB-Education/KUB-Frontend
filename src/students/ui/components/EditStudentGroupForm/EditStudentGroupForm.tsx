import {
  Form,
  FormControl,
  Root,
  GroupActions,
  GroupDelete,
  GroupInfo,
  GroupList,
  GroupListItem,
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
import { difference } from '@/common/utils';
import { StudentGroup, StudentGroupId } from '@/student-groups/entities';

export type EditStudentGroupFormProps = {
  studentGroups: Array<StudentGroup>;
  groups: Array<StudentGroup>;
  isPending: boolean;
  className?: string;
  onAdd: (id: StudentGroupId) => void;
  onDelete: (id: StudentGroupId) => void;
};

const EditStudentGroupForm = ({
  groups,
  studentGroups,
  isPending,
  className,
  onAdd,
  onDelete,
}: EditStudentGroupFormProps) => {
  const [isNewGroupFormVisible, setIsNewGroupFormVisible] = useState(false);

  const { handleSubmit, formState, control, reset } = useForm<{
    newGroup: StudentGroupId;
  }>({ mode: 'onChange' });

  const availableNewGroups = useMemo(() => {
    return difference(groups, studentGroups);
  }, [groups, studentGroups]);

  const onSubmit = async (values: { newGroup: StudentGroupId }) => {
    onAdd(values.newGroup);
    reset();
  };

  const getGroupId = (group: StudentGroup) => {
    return String(group.id);
  };

  const getGroupName = (group: StudentGroup) => {
    return group.name.toUpperCase();
  };

  const onDeleteGroup = (group: StudentGroup) => {
    onDelete(group.id);
  };

  const { isValid } = formState;

  const isConfirmGroupDisabled = !isValid || isPending;

  return (
    <Root className={className}>
      <GroupList>
        {studentGroups.map((group) => (
          <GroupListItem key={getGroupId(group)}>
            <FormControl>
              <FieldLabel shrink htmlFor={getGroupId(group)}>
                Group
              </FieldLabel>
              <FormTextField
                label="Group"
                id={getGroupId(group)}
                readOnly
                value={getGroupName(group)}
                endAdornment={
                  <GroupActions position="end">
                    <GroupInfo disabled={isPending}>Group info</GroupInfo>
                    <GroupDelete
                      disabled={isPending}
                      onClick={() => onDeleteGroup(group)}
                    >
                      Delete from group
                    </GroupDelete>
                  </GroupActions>
                }
              />
            </FormControl>
          </GroupListItem>
        ))}
      </GroupList>
      <Condition.When condition={!!availableNewGroups.length}>
        <Condition.If condition={!isNewGroupFormVisible}>
          <Condition.Then>
            <Actions>
              <SaveButton
                type="button"
                onClick={() => setIsNewGroupFormVisible(true)}
              >
                Add to group
              </SaveButton>
            </Actions>
          </Condition.Then>
          <Condition.Else>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FieldLabel htmlFor="newGroup">New Group</FieldLabel>
                <Controller
                  name="newGroup"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select label="New Group" {...field}>
                      {availableNewGroups.map((group) => (
                        <MenuItem
                          key={getGroupId(group)}
                          value={getGroupId(group)}
                        >
                          {getGroupName(group)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Actions>
                <SaveButton type="submit" disabled={isConfirmGroupDisabled}>
                  Confirm
                </SaveButton>
              </Actions>
            </Form>
          </Condition.Else>
        </Condition.If>
      </Condition.When>
    </Root>
  );
};

export default EditStudentGroupForm;
