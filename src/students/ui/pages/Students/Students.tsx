import { useGetStudents } from '@/students/hooks';
import { Root, Table, Toolbar } from './styles.tsx';
import { useMemo, useState } from 'react';
import { getUserId } from '@/users/entities';
import { Student, StudentId } from '@/students/entities';

const Students = () => {
  const { students, isError, isFetching } = useGetStudents();

  const [selectedStudentsIds, setSelectedStudentsIds] = useState<
    Array<StudentId>
  >([]);

  const selectedStudents = useMemo<Student[]>(() => {
    return students.reduce((acc: Array<Student>, user) => {
      return selectedStudentsIds.includes(user.id) ? [...acc, user] : acc;
    }, []);
  }, [students, selectedStudentsIds]);

  const onStudentsSelected = (students: Array<Student>) => {
    const studentIds = students.map(getUserId);
    setSelectedStudentsIds(studentIds);
  };

  return (
    <Root>
      <Toolbar
        selectedStudents={selectedStudents}
        onAdd={() => console.log('add')}
        onDelete={() => console.log('delete')}
        onResend={() => console.log('resend')}
        onEdit={() => console.log('edit')}
      />
      <Table
        data={students}
        isError={isError}
        isLoading={isFetching}
        onStudentsSelected={onStudentsSelected}
      />
    </Root>
  );
};

export default Students;
