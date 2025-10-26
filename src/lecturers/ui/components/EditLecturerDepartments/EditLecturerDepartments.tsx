import {
  Root,
  Department,
  DepartmentInfo,
  DepartmentInfoRow,
  DepartmentDeleteControl,
  DepartmentDetailsControl,
  DepartmentList,
  DepartmentListItem,
  FormControl,
  DepartmentName,
  DepartmentNameText,
  Actions,
} from './styles.tsx';
import {
  getAvailableLecturerDepartments,
  Lecturer,
} from '@/lecturers/entities';
import {
  Department as DepartmentType,
  DepartmentId,
} from '@/departments/entities';
import {
  AddButton,
  Condition,
  FieldLabel,
  FormTextField,
} from '@/common/ui/components';
import { useMemo } from 'react';

export type EditLecturerDepartmentsProps = {
  lecturer: Lecturer;
  departments: Array<DepartmentType>;
  isPending: boolean;
  className?: string;
  onAdd: () => void;
  onDelete: (departmentId: DepartmentId) => void;
  onDetails: (departmentId: DepartmentId) => void;
};

const EditLecturerDepartments = ({
  lecturer,
  departments,
  isPending,
  className,
  onDetails,
  onAdd,
  onDelete,
}: EditLecturerDepartmentsProps) => {
  const isNewDepartmentsAvailable = useMemo(() => {
    const availableDepartments = getAvailableLecturerDepartments(
      lecturer.departments,
      departments,
    );
    return !!availableDepartments.length;
  }, [departments, lecturer]);

  return (
    <Root className={className}>
      <DepartmentList>
        {lecturer.departments.map((department) => (
          <DepartmentListItem key={department.id}>
            <Department>
              <DepartmentName>
                <FieldLabel shrink htmlFor={String(department.id)}>
                  Department
                </FieldLabel>
                <DepartmentNameText
                  label="Department"
                  id={String(department.id)}
                  readOnly
                  multiline
                  value={department.name}
                />
              </DepartmentName>
              <DepartmentInfo>
                <DepartmentInfoRow>
                  <FormControl>
                    <FieldLabel shrink htmlFor={department.position}>
                      Position
                    </FieldLabel>
                    <FormTextField
                      label="Position"
                      id={department.position}
                      readOnly
                      value={department.position}
                    />
                  </FormControl>
                  <DepartmentDetailsControl
                    disabled={isPending}
                    onClick={() => onDetails(department.id)}
                  >
                    Details
                  </DepartmentDetailsControl>
                </DepartmentInfoRow>
                <DepartmentInfoRow>
                  <FormControl>
                    <FieldLabel shrink htmlFor={department.status}>
                      Status
                    </FieldLabel>
                    <FormTextField
                      label="Status"
                      id={department.status}
                      readOnly
                      value={department.status}
                    />
                  </FormControl>
                  <DepartmentDeleteControl
                    disabled={isPending}
                    onClick={() => onDelete(department.id)}
                  >
                    Delete
                  </DepartmentDeleteControl>
                </DepartmentInfoRow>
              </DepartmentInfo>
            </Department>
          </DepartmentListItem>
        ))}
      </DepartmentList>
      <Condition.When condition={isNewDepartmentsAvailable}>
        <Actions>
          <AddButton disabled={isPending} type="button" onClick={onAdd}>
            Add to department
          </AddButton>
        </Actions>
      </Condition.When>
    </Root>
  );
};

export default EditLecturerDepartments;
