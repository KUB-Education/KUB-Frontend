import {
  AddDepartmentPositionParams,
  getAvailableDepartmentPositions,
  Lecturer,
  LecturerPosition as Position,
  LecturerPositionId,
} from '@/lecturers/entities';
import { Actions, Content, Form, FormControl, Title } from './styles';
import { BackButton, FieldLabel, SaveButton } from '@/common/ui/components';
import { Department, DepartmentId } from '@/departments/entities';
import { Controller, useForm } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators';
import { useMemo } from 'react';

export type AddDepartmentPositionProps = {
  lecturer: Lecturer;
  positions: Position[];
  departments: Department[];
  isPending: boolean;
  onAdd: (params: AddDepartmentPositionParams) => void;
  onBack: () => void;
};

const AddDepartmentPosition = ({
  lecturer,
  departments,
  positions,
  isPending,
  onAdd,
  onBack,
}: AddDepartmentPositionProps) => {
  const { handleSubmit, formState, control, reset } = useForm<{
    departmentId: DepartmentId;
    positionId: LecturerPositionId;
  }>({ mode: 'onChange' });

  const availableDepartments = useMemo(() => {
    return getAvailableDepartmentPositions(
      lecturer.departmentPositions,
      departments,
    );
  }, [departments, lecturer]);

  const onSubmit = async (values: {
    departmentId: DepartmentId;
    positionId: LecturerPositionId;
  }) => {
    onAdd({ lecturerId: lecturer.id, ...values });
    reset();
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add department position</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="departmentId">
            Department
          </FieldLabel>
          <Controller
            name="departmentId"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Department" {...field}>
                {availableDepartments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="positionId">
            Position
          </FieldLabel>
          <Controller
            name="positionId"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="Position" {...field}>
                {positions.map((position) => (
                  <MenuItem key={String(position.id)} value={position.id}>
                    {position.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Actions>
          <BackButton onClick={onBack} />
          <SaveButton loading={isPending} disabled={!isValid} type="submit" />
        </Actions>
      </Form>
    </Content>
  );
};

export default AddDepartmentPosition;
