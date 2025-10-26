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
  getAvailableDepartmentPositions,
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

const EditDepartmentPositions = ({
  lecturer,
  departments,
  isPending,
  className,
  onDetails,
  onAdd,
  onDelete,
}: EditLecturerDepartmentsProps) => {
  const isNewDepartmentPositionsAvailable = useMemo(() => {
    const availableDepartmentPositions = getAvailableDepartmentPositions(
      lecturer.departmentPositions,
      departments,
    );
    return !!availableDepartmentPositions.length;
  }, [departments, lecturer]);

  return (
    <Root className={className}>
      <DepartmentList>
        {lecturer.departmentPositions.map((departmentPosition) => (
          <DepartmentListItem key={departmentPosition.id}>
            <Department>
              <DepartmentName>
                <FieldLabel
                  shrink
                  htmlFor={String(departmentPosition.department.id)}
                >
                  Department
                </FieldLabel>
                <DepartmentNameText
                  label="Department"
                  id={String(departmentPosition.department.id)}
                  readOnly
                  multiline
                  value={departmentPosition.department.name}
                />
              </DepartmentName>
              <DepartmentInfo>
                <DepartmentInfoRow>
                  <FormControl>
                    <FieldLabel
                      shrink
                      htmlFor={String(departmentPosition.position.id)}
                    >
                      Position
                    </FieldLabel>
                    <FormTextField
                      label="Position"
                      id={String(departmentPosition.position.id)}
                      readOnly
                      value={departmentPosition.position.name}
                    />
                  </FormControl>
                  <DepartmentDetailsControl
                    disabled={isPending}
                    onClick={() => onDetails(departmentPosition.id)}
                  >
                    Details
                  </DepartmentDetailsControl>
                </DepartmentInfoRow>
                <DepartmentInfoRow>
                  <FormControl>
                    <FieldLabel shrink htmlFor={departmentPosition.status}>
                      Status
                    </FieldLabel>
                    <FormTextField
                      label="Status"
                      id={departmentPosition.status}
                      readOnly
                      value={departmentPosition.status}
                    />
                  </FormControl>
                  <DepartmentDeleteControl
                    disabled={isPending}
                    onClick={() => onDelete(departmentPosition.id)}
                  >
                    Delete
                  </DepartmentDeleteControl>
                </DepartmentInfoRow>
              </DepartmentInfo>
            </Department>
          </DepartmentListItem>
        ))}
      </DepartmentList>
      <Condition.When condition={isNewDepartmentPositionsAvailable}>
        <Actions>
          <AddButton disabled={isPending} type="button" onClick={onAdd}>
            Add to department
          </AddButton>
        </Actions>
      </Condition.When>
    </Root>
  );
};

export default EditDepartmentPositions;
