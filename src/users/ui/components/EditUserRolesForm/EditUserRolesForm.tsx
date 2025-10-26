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
import { UserRole } from '@/users/entities';
import { Controller, useForm } from 'react-hook-form';
import { requiredValidator } from '@/common/utils/validators.ts';
import { useMemo, useState } from 'react';
import { difference } from '@/common/utils';

export type EditUserRolesFormProps = {
  userRoles: Array<UserRole>;
  roles: Array<UserRole>;
  isPending: boolean;
  className?: string;
  onAdd: (role: UserRole) => void;
  onDelete: (role: UserRole) => void;
};

const EditUserRolesForm = ({
  userRoles,
  roles,
  isPending,
  className,
  onAdd,
  onDelete,
}: EditUserRolesFormProps) => {
  const [isNewRoleFormVisible, setIsNewRoleFormVisible] = useState(false);

  const { handleSubmit, formState, control, reset } = useForm<{
    roleId: UserRole['id'];
  }>({ mode: 'onChange' });

  const availableNewRoles = useMemo(() => {
    return difference(roles, userRoles);
  }, [roles, userRoles]);

  const onSubmit = async (values: { roleId: UserRole['id'] }) => {
    const newRole = roles.find((role) => role.id === values.roleId);

    if (!newRole) return;

    onAdd(newRole);
    reset();
  };

  const { isValid } = formState;

  const isConfirmRoleDisabled = !isValid || isPending;

  return (
    <Root className={className}>
      <RoleList>
        {userRoles.map((role) => (
          <RoleListItem key={role.id}>
            <FormControl>
              <FieldLabel shrink htmlFor={String(role.id)}>
                Role
              </FieldLabel>
              <FormTextField
                label="Role"
                id={String(role.id)}
                readOnly
                value={role.type}
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
                <FieldLabel htmlFor="roleId">New Role</FieldLabel>
                <Controller
                  name="roleId"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select label="New Role" {...field}>
                      {availableNewRoles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.type}
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
