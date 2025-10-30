import {
  LecturerDepartmentPosition,
  LecturerPositionStatus as Status,
  LecturerPosition as Position,
  LecturerPositionId,
  EditDepartmentPositionParams,
  lecturerPositionStatuses,
} from '@/lecturers/entities';
import {
  Actions,
  Content,
  Form,
  FormControl,
  Title,
  DeleteButton,
} from './styles';
import {
  BackButton,
  FieldLabel,
  FormTextField,
  SaveButton,
} from '@/common/ui/components';
import { Controller, useForm } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';
import { requiredValidator } from '@/common/utils/validators';
import { LecturerPositionStatus } from '@/lecturers/ui/components';
import { DepartmentId } from '@/departments/entities';

export type DepartmentPositionDetailsProps = {
  positions: Array<Position>;
  departmentPosition: LecturerDepartmentPosition;
  isPending: boolean;
  onEdit: (data: Omit<EditDepartmentPositionParams, 'lecturerId'>) => void;
  onDelete: (departmentId: DepartmentId) => void;
  onBack: () => void;
};

const DepartmentPositionDetails = ({
  positions,
  departmentPosition,
  isPending,
  onEdit,
  onDelete,
  onBack,
}: DepartmentPositionDetailsProps) => {
  const { department, position, status } = departmentPosition;

  const { handleSubmit, formState, control } = useForm<{
    status: Status;
    positionId: LecturerPositionId;
  }>({
    mode: 'onChange',
    values: { positionId: position.id, status },
  });

  const onSubmit = async (values: {
    status: Status;
    positionId: LecturerPositionId;
  }) => {
    onEdit({
      departmentPositionId: departmentPosition.id,
      ...values,
    });
  };

  const onDeleteDepartmentPosition = () => {
    onDelete(departmentPosition.id);
  };

  const { isValid, isDirty } = formState;

  const isConfirmDisabled = !isValid || isPending || !isDirty;

  return (
    <Content>
      <Title>Add department position</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel shrink htmlFor="department">
            Department
          </FieldLabel>
          <FormTextField
            label="Department"
            id="department"
            readOnly
            value={department.name}
          />
        </FormControl>
        <FormControl>
          <FieldLabel shrink htmlFor="position">
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
        <FormControl>
          <FieldLabel shrink htmlFor="status">
            Status
          </FieldLabel>
          <Controller
            name="status"
            control={control}
            rules={{ ...requiredValidator() }}
            render={({ field }) => (
              <Select notched label="status" {...field}>
                {lecturerPositionStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    <LecturerPositionStatus value={status} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Actions>
          <BackButton onClick={onBack} />
          <DeleteButton
            loading={isPending}
            onClick={onDeleteDepartmentPosition}
          >
            Delete lecturer
          </DeleteButton>
          <SaveButton
            loading={isPending}
            disabled={isConfirmDisabled}
            type="submit"
          />
        </Actions>
      </Form>
    </Content>
  );
};

export default DepartmentPositionDetails;
