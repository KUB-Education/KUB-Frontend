import { Department, DepartmentId } from '@/departments/entities';
import { Root, Toolbar, Table } from './styles';
import {
  useDeleteDepartment,
  useDepartmentsQuery,
} from '@/departments/hooks';
import { useMemo, useState } from 'react';
import { AddDepartmentModal, EditDepartmentModal } from '@/departments/ui/components';

const Departments = () => {
  const { departments } = useDepartmentsQuery();
  const { deleteDepartments } = useDeleteDepartment();

  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedDepartmentsIds = useMemo<DepartmentId[]>(() => {
    return selectedDepartments.map((department) => department.id);
  }, [selectedDepartments]);

  const onDelete = () => {
    if (!selectedDepartmentsIds.length) return;

    deleteDepartments(selectedDepartmentsIds);
  };

  const onEdit = () => {
    setIsEditModalVisible(true);
  };
  return (
    <Root>
      <Toolbar
        selectedDepartments={selectedDepartments}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Table data={departments} onDepartmentsSelected={setSelectedDepartments} />

      <AddDepartmentModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
      <EditDepartmentModal
        open={isEditModalVisible}
        department={selectedDepartments[0]}
        onClose={() => setIsEditModalVisible(false)}
      />
    </Root>
  );
};

export default Departments;
