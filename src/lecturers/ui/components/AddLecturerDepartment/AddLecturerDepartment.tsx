import {
  AddLecturerToDepartmentParams,
  getAvailableLecturerDepartments,
  Lecturer,
  LecturerPosition as Position,
  lecturerPositions,
} from '@/lecturers/entities';
import { Actions, Content, Form, FormControl, Title } from './styles';
import { BackButton, FieldLabel, SaveButton } from '@/common/ui/components';
import { Department, DepartmentId } from '@/departments/entities';
import { Controller, useForm } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators';
import { LecturerPosition } from '@/lecturers/ui/components';
import { useMemo } from 'react';

export type AddLecturerDepartmentProps = {
  lecturer: Lecturer;
  departments: Department[];
  isPending: boolean;
  onAdd: (params: AddLecturerToDepartmentParams) => void;
  onBack: () => void;
};

const AddLecturerDepartment = ({
  lecturer,
  departments,
  isPending,
  onAdd,
  onBack,
}: AddLecturerDepartmentProps) => {
  const { handleSubmit, formState, control, reset } = useForm<{
    department: DepartmentId;
    position: Position;
  }>({
    mode: 'onChange',
  });

  const availableDepartments = useMemo(() => {
    return getAvailableLecturerDepartments(lecturer.departments, departments);
  }, [departments, lecturer]);

  const onSubmit = async (values: {
    department: DepartmentId;
    position: Position;
  }) => {
    const department = departments.find(
      (department) => department.id === values.department,
    );

    if (!department) return;

    onAdd({
      lecturerId: lecturer.id,
      id: values.department,
      position: values.position,
      name: department.name,
    });
    reset();
  };

  const { isValid } = formState;

  return (
    <Content>
      <Title>Add department position</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="department">
            Department
          </FieldLabel>
          <Controller
            name="department"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="department" {...field}>
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
          <FieldLabel shrink htmlFor="position">
            Position
          </FieldLabel>
          <Controller
            name="position"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="position" {...field}>
                {lecturerPositions.map((position) => (
                  <MenuItem key={position} value={position}>
                    <LecturerPosition value={position} />
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

export default AddLecturerDepartment;
