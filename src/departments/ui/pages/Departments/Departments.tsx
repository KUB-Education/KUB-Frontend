import { Department, DepartmentId } from '@/departments/entities';
import { Root, Toolbar, Table } from './styles';
import { useDeleteDepartment, useDepartments } from '@/departments/hooks';
import { useMemo, useState } from 'react';
import { AddDepartment, DepartmentDetails } from '@/departments/ui/components';
import { ErrorModal, Modal } from '@/common/ui/components';

const Departments = () => {
  const onDeleteError = () => {
    setIsDeleteErrorModalVisible(true);
  };

  const { departments, isFetching, isError } = useDepartments();
  const { deleteDepartments, error: deleteError } = useDeleteDepartment({
    onError: onDeleteError,
  });

  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState<
    DepartmentId[]
  >([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isDeleteErrorModalVisible, setIsDeleteErrorModalVisible] =
    useState(false);

  const selectedDepartments = useMemo<Department[]>(() => {
    return departments.reduce((acc: Array<Department>, department) => {
      return selectedDepartmentIds.includes(department.id)
        ? [...acc, department]
        : acc;
    }, []);
  }, [departments, selectedDepartmentIds]);

  const onDepartmentSelected = (departments: Array<Department>) => {
    const departmentIds = departments.map((department) => department.id);
    setSelectedDepartmentIds(departmentIds);
  };

  const onDelete = () => {
    if (!selectedDepartmentIds.length) return;

    deleteDepartments(selectedDepartmentIds);
  };

  const onDetails = () => {
    setIsDetailsModalVisible(true);
  };

  return (
    <Root>
      <Toolbar
        selectedDepartments={selectedDepartments}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onDetails={onDetails}
      />
      <Table
        data={departments}
        isLoading={isFetching}
        isError={isError}
        onDepartmentsSelected={onDepartmentSelected}
      />

      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <AddDepartment
          onBack={() => setIsAddModalVisible(false)}
          onSucceed={() => setIsAddModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
      >
        <DepartmentDetails
          department={selectedDepartments[0]}
          onBack={() => setIsDetailsModalVisible(false)}
          onSucceed={() => setIsDetailsModalVisible(false)}
        />
      </Modal>

      <ErrorModal
        open={isDeleteErrorModalVisible}
        onClose={() => setIsDeleteErrorModalVisible(false)}
        onContinue={() => setIsDeleteErrorModalVisible(false)}
      >
        {deleteError?.message}
      </ErrorModal>
    </Root>
  );
};

export default Departments;
