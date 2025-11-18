import {
  Content,
  Title,
  Col,
  Row,
  EditForm,
  Actions,
  EditStudentGroup,
  EditStudentEducationalProgram,
} from './styles';
import {
  useAddStudentEducationalProgram,
  useDeleteStudentEducationalProgram,
  useDeleteStudents,
  useEditStudent,
  useEditStudentEducationalProgram,
  useResendStudentsActivationEmail,
} from '@/students/hooks';
import {
  Student,
  StudentEducationalProgram,
  StudentEducationalProgramId,
} from '@/students/entities';
import { StudentGroup, StudentGroupId } from '@/student-groups/entities';
import {
  BackButton,
  DeleteButton,
  ErrorModal,
  Modal,
} from '@/common/ui/components';
import { useMemo, useState } from 'react';
import AddStudentEducationalProgram from '../AddStudentEducationalProgram';
import { StudentEducationalProgramDetails } from '@/students/ui/components';
import { EducationalProgram } from '@/educational-programs/entities';

export type StudentDetailsProps = {
  student: Student;
  studentGroups: Array<StudentGroup>;
  educationalPrograms: Array<EducationalProgram>;
  onBack: () => void;
  onDeleteSucceed: () => void;
};

const StudentDetails = ({
  student,
  studentGroups,
  educationalPrograms,
  onBack,
  onDeleteSucceed,
}: StudentDetailsProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isAddProgramModalVisible, setIsAddProgramModalVisible] =
    useState(false);
  const [studentProgramIdForDetails, setStudentProgramIdForDetails] =
    useState<StudentEducationalProgramId | null>(null);

  const {
    editStudent,
    isPending: isEditPending,
    error: editStudentError,
  } = useEditStudent({ onError });
  const {
    deleteStudents,
    isPending: isDeletePending,
    error: deleteStudentError,
  } = useDeleteStudents({
    onSuccess: onDeleteSucceed,
  });
  const {
    resendStudentsActivationEmail,
    isPending: isResendPending,
    error: resendEmailError,
  } = useResendStudentsActivationEmail({ onError });

  const {
    addStudentEducationalProgram,
    isPending: isAddStudentProgramPending,
    error: addStudentProgramError,
  } = useAddStudentEducationalProgram({
    onSuccess: () => setIsAddProgramModalVisible(false),
    onError,
  });
  const {
    editStudentEducationalProgram,
    isPending: isEditStudentProgramPending,
    error: editStudentProgramError,
  } = useEditStudentEducationalProgram({
    onSuccess: () => setStudentProgramIdForDetails(null),
    onError,
  });
  const {
    deleteStudentEducationalProgram,
    isPending: isDeleteStudentProgramPending,
    error: deleteStudentProgramError,
  } = useDeleteStudentEducationalProgram({
    onError,
  });

  const isPending = useMemo(() => {
    return [
      isDeletePending,
      isEditPending,
      isResendPending,
      isAddStudentProgramPending,
      isEditStudentProgramPending,
      isDeleteStudentProgramPending,
    ].some(Boolean);
  }, [
    isDeletePending,
    isEditPending,
    isResendPending,
    isAddStudentProgramPending,
    isEditStudentProgramPending,
    isDeleteStudentProgramPending,
  ]);

  const error = useMemo(() => {
    const errors = [
      editStudentError,
      deleteStudentError,
      resendEmailError,
      addStudentProgramError,
      editStudentProgramError,
      deleteStudentProgramError,
    ].filter(Boolean);

    return errors[0];
  }, [
    editStudentError,
    deleteStudentError,
    resendEmailError,
    addStudentProgramError,
    editStudentProgramError,
    deleteStudentProgramError,
  ]);

  const studentProgramForDetails = useMemo(() => {
    return student.educationalPrograms.find(
      (studentProgram) => studentProgram.id === studentProgramIdForDetails,
    );
  }, [student, studentProgramIdForDetails]);

  const onDelete = () => {
    deleteStudents([student.id]);
  };

  const onResend = () => {
    resendStudentsActivationEmail([student.id]);
  };

  const onDeleteEducationalProgram = (
    programId: StudentEducationalProgramId,
  ) => {
    deleteStudentEducationalProgram({
      studentId: student.id,
      studentEducationalProgramId: programId,
    });
  };

  const onAddGroup = (groupId: StudentGroupId) => {
    editStudent({
      id: student.id,
      groups: [...student.groups.map((group) => group.id), groupId],
    });
  };

  const onDeleteGroup = (groupId: StudentGroupId) => {
    editStudent({
      id: student.id,
      groups: student.groups
        .map((group) => group.id)
        .filter((id) => id !== groupId),
    });
  };

  const onStudentProgramDetails = (
    studentProgramId: StudentEducationalProgramId,
  ) => {
    setStudentProgramIdForDetails(studentProgramId);
  };

  return (
    <Content>
      <Row>
        <Col>
          <Title>Student information</Title>
          <EditForm
            student={student}
            isPending={isPending}
            onEdit={editStudent}
            onResend={onResend}
          />
        </Col>
        <Col>
          <Title>Educational programs</Title>
          <EditStudentEducationalProgram
            educationalPrograms={educationalPrograms}
            studentEducationalPrograms={student.educationalPrograms}
            isPending={isPending}
            onAdd={() => setIsAddProgramModalVisible(true)}
            onDelete={onDeleteEducationalProgram}
            onDetails={onStudentProgramDetails}
          />
        </Col>
        <Col>
          <Title>Groups</Title>
          <EditStudentGroup
            groups={studentGroups}
            studentGroups={student.groups}
            isPending={isPending}
            onAdd={onAddGroup}
            onDelete={onDeleteGroup}
          />
        </Col>
      </Row>
      <Actions>
        <BackButton onClick={onBack} />
        <DeleteButton disabled={isPending} onClick={onDelete}>
          Delete user
        </DeleteButton>
      </Actions>

      <Modal
        open={isAddProgramModalVisible}
        onClose={() => setIsAddProgramModalVisible(false)}
      >
        <AddStudentEducationalProgram
          student={student}
          educationalPrograms={educationalPrograms}
          isPending={isPending}
          onBack={() => setIsAddProgramModalVisible(false)}
          onAdd={addStudentEducationalProgram}
        />
      </Modal>
      <Modal
        open={!!studentProgramForDetails}
        onClose={() => setStudentProgramIdForDetails(null)}
      >
        <StudentEducationalProgramDetails
          student={student}
          studentEducationalProgram={
            studentProgramForDetails as StudentEducationalProgram
          }
          isPending={isPending}
          onBack={() => setStudentProgramIdForDetails(null)}
          onEdit={editStudentEducationalProgram}
        />
      </Modal>

      <ErrorModal
        open={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        onContinue={() => setIsErrorModalVisible(false)}
      >
        {error?.message}
      </ErrorModal>
    </Content>
  );
};

export default StudentDetails;
