import { Student, StudentId } from '@/students/ui/pages/entities';
import { Root, Toolbar, Table } from './styles';
import {
  useDeleteStudents,
  useStudentsQuery,
  // useResendStudentsInvites,
} from '@/students/ui/pages/hooks';
import { useMemo, useState } from 'react';
import {
  AddStudentModal,
  EditStudentModal,
} from '@/students/ui/pages/ui/components';
// import { useDepartmentsQuery } from '@/departments/hooks';

const Students = () => {
  const { students } = useStudentsQuery();
  // const { departments } = useDepartmentsQuery();
  const { deleteStudents } = useDeleteStudents();
  // const { resendStudentsInvites } = useResendStudentsInvites();

  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedStudentsIds = useMemo<StudentId[]>(() => {
    return selectedStudents.map((student) => student.id);
  }, [selectedStudents]);

  const onDelete = () => {
    if (!selectedStudentsIds.length) return;

    deleteStudents(selectedStudentsIds);
  };

  const onResend = () => {
    if (!selectedStudentsIds.length) return;

    // resendStudentsInvites(selectedStudentsIds);
  };

  const onEdit = () => {
    setIsEditModalVisible(true);
  };

  return (
    <Root>
      <Toolbar
        selectedStudents={selectedStudents}
        onAdd={() => setIsAddModalVisible(true)}
        onResend={onResend}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Table data={students} onStudentsSelected={setSelectedStudents} />

      <AddStudentModal
        open={isAddModalVisible}
        // departments={departments}
        onClose={() => setIsAddModalVisible(false)}
      />
      <EditStudentModal
        open={isEditModalVisible}
        student={selectedStudents[0]}
        // departments={departments}
        onClose={() => setIsEditModalVisible(false)}
      />
    </Root>
  );
};

export default Students;
