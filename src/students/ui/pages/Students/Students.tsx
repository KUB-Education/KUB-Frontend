import {
  useDeleteStudents,
  useGetStudents,
  useResendStudentsActivationEmail,
} from '@/students/hooks';
import { Root, Table, Toolbar } from './styles.tsx';
import { useMemo, useState } from 'react';
import { getUserId } from '@/users/entities';
import { Student, StudentId } from '@/students/entities';
import { Modal } from '@/common/ui/components';
import { AddStudent, EditStudent } from '@/students/ui/components';

const Students = () => {
  const { students, isError, isFetching } = useGetStudents();
  const { deleteStudents } = useDeleteStudents();
  const { resendStudentsActivationEmail } = useResendStudentsActivationEmail();

  const [selectedStudentsIds, setSelectedStudentsIds] = useState<
    Array<StudentId>
  >([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedStudents = useMemo<Student[]>(() => {
    return students.reduce((acc: Array<Student>, user) => {
      return selectedStudentsIds.includes(user.id) ? [...acc, user] : acc;
    }, []);
  }, [students, selectedStudentsIds]);

  const onStudentsSelected = (students: Array<Student>) => {
    const studentIds = students.map(getUserId);
    setSelectedStudentsIds(studentIds);
  };

  const onDelete = () => {
    if (!selectedStudentsIds.length) return;

    deleteStudents(selectedStudentsIds);
  };

  const onResend = () => {
    if (!selectedStudentsIds.length) return;

    resendStudentsActivationEmail(selectedStudentsIds);
  };

  return (
    <Root>
      <Toolbar
        selectedStudents={selectedStudents}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onResend={onResend}
        onEdit={() => setIsEditModalVisible(true)}
      />
      <Table
        data={students}
        isError={isError}
        isLoading={isFetching}
        onStudentsSelected={onStudentsSelected}
      />

      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <AddStudent onSuccess={() => setIsAddModalVisible(false)} />
      </Modal>
      <Modal
        open={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
      >
        <EditStudent
          student={selectedStudents[0]}
          onBack={() => setIsEditModalVisible(false)}
          onDeleteSucceed={() => setIsEditModalVisible(false)}
        />
      </Modal>
    </Root>
  );
};

export default Students;
