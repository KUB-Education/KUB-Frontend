import { Root, Table, Toolbar } from './styles';
import { useMemo, useState } from 'react';
import { useDeleteStudentGroups, useStudentGroups } from '@/student-groups/hooks';
import { StudentGroup, StudentGroupId } from '@/student-groups/entities';
import { AddStudentGroup, StudentGroupDetails } from '@/student-groups/ui/components';
import Modal from '@/common/ui/components/Modal';
import ErrorModal from '@/common/ui/components/ErrorModal/ErrorModal';

const StudentGroups = () => {
  const { studentGroups, isError, isFetching } = useStudentGroups();
  const { deleteStudentGroups, error: deleteError } = useDeleteStudentGroups();

  const [selectedStudentGroupsIds, setSelectedStudentGroupsIds] = useState<
    Array<StudentGroupId>
  >([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isDeleteErrorModalVisible, setIsDeleteErrorModalVisible] =
    useState(false);

  const selectedStudentGroups = useMemo<StudentGroup[]>(() => {
      return studentGroups.reduce((acc: Array<StudentGroup>, group) => {
        return selectedStudentGroupsIds.includes(group.id) ? [...acc, group] : acc;
      }, []);
    }, [studentGroups, selectedStudentGroupsIds]);

  const onStudentGroupsSelected = (studentGroups: Array<StudentGroup>) => {
    const studentGroupsIds = studentGroups.map(g => g.id);
    setSelectedStudentGroupsIds(studentGroupsIds);
  };

  const onDelete = () => {
    if (!selectedStudentGroupsIds.length) return;

    deleteStudentGroups(selectedStudentGroupsIds);
  };

  const onDetails = () => {
    setIsDetailsModalVisible(true);
  };

  return (
    <Root>
      <Toolbar
        selectedStudentGroups={selectedStudentGroups}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onDetails={onDetails}
      />
      <Table
        data={studentGroups}
        isError={isError}
        isLoading={isFetching}
        onStudentGroupsSelected={onStudentGroupsSelected}
      />

      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <AddStudentGroup
          onSuccess={() => setIsAddModalVisible(false)}
          onBack={() => setIsAddModalVisible(false) }/>
      </Modal>
      <Modal
        open={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
      >
        <StudentGroupDetails
          studentGruop={selectedStudentGroups[0]}
          onBack={() => setIsDetailsModalVisible(false)}
          onSucceed={() => setIsDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsDetailsModalVisible(false)}
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

export default StudentGroups;
