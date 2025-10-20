import {
  LecturerDepartment,
  LecturerPosition as Position,
  lecturerPositions,
  LecturerStatus as Status,
  lecturerStatuses,
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
import { LecturerPosition, LecturerStatus } from '@/lecturers/ui/components';
import { DepartmentId } from '@/departments/entities';

export type LecturerDepartmentDetailsProps = {
  department: LecturerDepartment;
  isPending: boolean;
  onEdit: (department: LecturerDepartment) => void;
  onDelete: (departmentId: DepartmentId) => void;
  onBack: () => void;
};

const LecturerDepartmentDetails = ({
  department,
  isPending,
  onEdit,
  onDelete,
  onBack,
}: LecturerDepartmentDetailsProps) => {
  const { handleSubmit, formState, control } = useForm<{
    status: Status;
    position: Position;
  }>({
    mode: 'onChange',
    values: { position: department.position, status: department.status },
  });

  const onSubmit = async (values: { status: Status; position: Position }) => {
    onEdit({ ...department, ...values });
  };

  const onDeleteFromDepartment = () => {
    onDelete(department.id);
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
                {lecturerStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    <LecturerStatus value={status} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Actions>
          <BackButton onClick={onBack} />
          <DeleteButton loading={isPending} onClick={onDeleteFromDepartment}>
            Delete lecturer
          </DeleteButton>
          <SaveButton loading={isPending} disabled={!isValid} type="submit" />
        </Actions>
      </Form>
    </Content>
  );
};

export default LecturerDepartmentDetails;
