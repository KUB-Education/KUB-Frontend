import {
  useDeleteStudents,
  useStudents,
  useResendStudentsActivationEmail,
} from '@/students/hooks';
import { Root, Table, Toolbar } from './styles';
import { useMemo, useState } from 'react';
import { getUserId } from '@/users/entities';
import { Student, StudentId } from '@/students/entities';
import { Modal } from '@/common/ui/components';
import { AddStudent, StudentDetails } from '@/students/ui/components';

const Students = () => {
  const { students, isError, isFetching } = useStudents();
  const { deleteStudents } = useDeleteStudents();
  const { resendStudentsActivationEmail } = useResendStudentsActivationEmail();

  const [selectedStudentsIds, setSelectedStudentsIds] = useState<
    Array<StudentId>
  >([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

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
        onDetails={() => setIsDetailsModalVisible(true)}
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
        open={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
      >
        <StudentDetails
          student={selectedStudents[0]}
          onBack={() => setIsDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsDetailsModalVisible(false)}
        />
      </Modal>
    </Root>
  );
};

export default Students;
