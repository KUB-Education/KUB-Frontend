import { Content, Title, Col, Row, EditForm, Actions } from './styles.tsx';
import {
  useDeleteStudents,
  useEditStudent,
  useResendStudentsActivationEmail,
} from '@/students/hooks';
import { Student } from '@/students/entities';
import EditStudentEducationalProgramForm from '../EditStudentEducationalProgramForm';
import EditStudentGroupForm from '../EditStudentGroupForm';
import { useStudentGroups } from '@/student-groups/hooks';
import { useEducationalPrograms } from '@/educational-programs/hooks';
import { EducationalProgramId } from '@/educational-programs/entities';
import { StudentGroupId } from '@/student-groups/entities';
import { BackButton, DeleteButton, ErrorModal } from '@/common/ui/components';
import { useMemo, useState } from 'react';

export type EditStudentProps = {
  student: Student;
  onBack: () => void;
  onDeleteSucceed: () => void;
};

const EditStudent = ({
  student,
  onBack,
  onDeleteSucceed,
}: EditStudentProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const { studentGroups } = useStudentGroups();
  const { educationalPrograms } = useEducationalPrograms();
  const {
    editStudent,
    isPending: isEditPending,
    error,
  } = useEditStudent({ onError });
  const { deleteStudents, isPending: isDeletePending } = useDeleteStudents({
    onSuccess: onDeleteSucceed,
  });
  const { resendStudentsActivationEmail, isPending: isResendPending } =
    useResendStudentsActivationEmail({ onError });

  const isEditFormPending = useMemo(() => {
    return isDeletePending || isEditPending || isResendPending;
  }, [isEditPending, isResendPending, isDeletePending]);

  const onDelete = () => {
    deleteStudents([student.id]);
  };

  const onResend = () => {
    resendStudentsActivationEmail([student.id]);
  };

  const onAddEducationalProgram = (programId: EducationalProgramId) => {
    editStudent({
      id: student.id,
      educationalPrograms: [
        ...student.educationalPrograms.map((program) => program.id),
        programId,
      ],
    });
  };

  const onDeleteEducationalProgram = (programId: EducationalProgramId) => {
    editStudent({
      id: student.id,
      educationalPrograms: student.educationalPrograms
        .map((program) => program.id)
        .filter((id) => id !== programId),
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

  return (
    <Content>
      <Row>
        <Col>
          <Title>User information</Title>
          <EditForm
            student={student}
            isPending={isEditFormPending}
            onEdit={editStudent}
            onResend={onResend}
          />
        </Col>
        <Col>
          <Title>Educational programs</Title>
          <EditStudentEducationalProgramForm
            educationalPrograms={educationalPrograms}
            studentEducationalPrograms={student.educationalPrograms}
            isPending={isEditFormPending}
            onAdd={onAddEducationalProgram}
            onDelete={onDeleteEducationalProgram}
          />
        </Col>
        <Col>
          <Title>Groups</Title>
          <EditStudentGroupForm
            groups={studentGroups}
            studentGroups={student.groups}
            isPending={isEditFormPending}
            onAdd={onAddGroup}
            onDelete={onDeleteGroup}
          />
        </Col>
      </Row>
      <Actions>
        <BackButton onClick={onBack} />
        <DeleteButton disabled={isDeletePending} onClick={onDelete}>
          Delete user
        </DeleteButton>
      </Actions>

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

export default EditStudent;
