import {
  Form,
  FormControl,
  RoleActions,
  Root,
  RoleList,
  RoleListItem,
  RoleInfo,
  RoleDelete,
  Actions,
} from './styles.tsx';
import { MenuItem, Select } from '@mui/material';
import { FieldLabel, FormTextField, SaveButton } from '@/common/ui/components';
import UserRoleLabel from '../UserRole';
import {
  getUserRoleLabel,
  UserRole,
  userRoles as allUserRoles,
} from '@/users/entities';
import { Controller, useForm } from 'react-hook-form';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useMemo, useState } from 'react';
import { difference } from '@/common/utils';

export type EditUserRolesFormProps = {
  userRoles: Array<UserRole>;
  isPending: boolean;
  className?: string;
  onAdd: (role: UserRole) => void;
  onDelete: (role: UserRole) => void;
};

const EditUserRolesForm = ({
  userRoles,
  isPending,
  className,
  onAdd,
  onDelete,
}: EditUserRolesFormProps) => {
  const [isNewRoleFormVisible, setIsNewRoleFormVisible] = useState(false);

  const { handleSubmit, formState, control, reset } = useForm<{
    newRole: UserRole;
  }>({ mode: 'onChange' });

  const availableNewRoles = useMemo(() => {
    return difference(allUserRoles, userRoles);
  }, [userRoles]);

  const onSubmit = async (values: { newRole: UserRole }) => {
    onAdd(values.newRole);
    reset();
  };

  const { isValid } = formState;

  const isConfirmRoleDisabled = !isValid || isPending;

  return (
    <Root className={className}>
      <RoleList>
        {userRoles.map((role) => (
          <RoleListItem key={role}>
            <FormControl>
              <FieldLabel shrink htmlFor={role}>
                Role
              </FieldLabel>
              <FormTextField
                label="Role"
                id={role}
                readOnly
                value={getUserRoleLabel(role).toUpperCase()}
                endAdornment={
                  <RoleActions position="end">
                    <RoleInfo disabled={isPending}>Role info</RoleInfo>
                    <RoleDelete
                      disabled={isPending}
                      onClick={() => onDelete(role)}
                    >
                      Delete role
                    </RoleDelete>
                  </RoleActions>
                }
              />
            </FormControl>
          </RoleListItem>
        ))}
      </RoleList>
      {!!availableNewRoles.length && (
        <>
          {/* TODO add animation */}
          {!isNewRoleFormVisible ? (
            <Actions>
              <SaveButton
                type="button"
                onClick={() => setIsNewRoleFormVisible(true)}
              >
                Add user role
              </SaveButton>
            </Actions>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FieldLabel htmlFor="newRole">New Role</FieldLabel>
                <Controller
                  name="newRole"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select label="New Role" {...field}>
                      {availableNewRoles.map((role) => (
                        <MenuItem key={role} value={role}>
                          <UserRoleLabel value={role} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Actions>
                <SaveButton type="submit" disabled={isConfirmRoleDisabled}>
                  Confirm
                </SaveButton>
              </Actions>
            </Form>
          )}
        </>
      )}
    </Root>
  );
};

export default EditUserRolesForm;
