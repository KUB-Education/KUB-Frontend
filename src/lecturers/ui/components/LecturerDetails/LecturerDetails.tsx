import {
  BackButton,
  DeleteButton,
  ErrorModal,
  Modal,
} from '@/common/ui/components';
import {
  Content,
  Title,
  Actions,
  Row,
  EditForm,
  EditDepartments,
  EditAcademicTitle,
  EditAcademicTitleCol,
  EditDepartmentsCol,
  EditFormCol,
} from './styles.tsx';
import {
  AcademicTitle,
  AcademicTitleId,
  AddLecturerToDepartmentParams,
  Lecturer,
  LecturerDepartment,
} from '@/lecturers/entities';
import {
  useAddLecturerToDepartment,
  useDeleteLecturers,
  useEditLecturer,
  useEditLecturerDepartment,
  useResendLecturersInvites,
} from '@/lecturers/hooks';
import { Department, DepartmentId } from '@/departments/entities';
import { useMemo, useState } from 'react';
import AddLecturerDepartment from '../AddLecturerDepartment';
import LecturerDepartmentDetails from '../LecturerDepartmentDetails';

export type LecturerDetailsModalProps = {
  lecturer: Lecturer;
  // TODO wait departments loading
  departments: Department[];
  academicTitles: AcademicTitle[];
  onBack: () => void;
  onDeleteSucceed: () => void;
};

const LecturerDetails = ({
  lecturer,
  departments,
  academicTitles,
  onBack,
  onDeleteSucceed,
}: LecturerDetailsModalProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isAddDepartmentModalVisible, setIsAddDepartmentModalVisible] =
    useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [departmentIdForDetails, setDepartmentIdForDetails] =
    useState<DepartmentId | null>(null);

  const { editLecturer, isPending: isEditPending, error } = useEditLecturer();
  const { deleteLecturers, isPending: isDeletePending } = useDeleteLecturers({
    onSuccess: onDeleteSucceed,
  });
  const { resendLecturersInvites, isPending: isResendPending } =
    useResendLecturersInvites({ onError });

  const { addLecturerToDepartment, isPending: isAddToDepartmentPending } =
    useAddLecturerToDepartment({
      onSuccess: () => setIsAddDepartmentModalVisible(false),
    });
  const { editLecturerDepartment, isPending: isEditDepartmentPending } =
    useEditLecturerDepartment({
      onSuccess: () => setDepartmentIdForDetails(null),
    });

  const isEditFormPending = useMemo(() => {
    return [
      isDeletePending,
      isEditPending,
      isResendPending,
      isAddToDepartmentPending,
      isEditDepartmentPending,
    ].some(Boolean);
  }, [
    isEditPending,
    isResendPending,
    isDeletePending,
    isAddToDepartmentPending,
    isEditDepartmentPending,
  ]);

  const departmentForDetails = useMemo(() => {
    return lecturer.departments.find(
      (department) => department.id === departmentIdForDetails,
    );
  }, [lecturer, departmentIdForDetails]);

  const onDelete = () => {
    deleteLecturers([lecturer.id]);
  };

  const onResend = () => {
    resendLecturersInvites([lecturer.id]);
  };

  const onAddToDepartment = (params: AddLecturerToDepartmentParams) => {
    addLecturerToDepartment(params);
  };

  const onDeleteFromDepartment = (departmentId: DepartmentId) => {
    const newDepartments = lecturer.departments.filter(
      (department) => department.id !== departmentId,
    );

    editLecturer({
      id: lecturer.id,
      departments: newDepartments,
    });
  };

  const onDepartmentDetails = (departmentId: DepartmentId) => {
    setDepartmentIdForDetails(departmentId);
  };

  const onEditLecturerDepartment = (updatedDepartment: LecturerDepartment) => {
    editLecturerDepartment({
      lecturerId: lecturer.id,
      id: updatedDepartment.id,
      position: updatedDepartment.position,
      status: updatedDepartment.status,
    });
  };

  const onAddAcademicTitle = (titleId: AcademicTitleId) => {
    editLecturer({
      id: lecturer.id,
      academicTitles: [
        ...lecturer.academicTitles.map((title) => title.id),
        titleId,
      ],
    });
  };

  const onDeleteAcademicTitle = (titleId: AcademicTitleId) => {
    editLecturer({
      id: lecturer.id,
      academicTitles: lecturer.academicTitles
        .map((tittle) => tittle.id)
        .filter((id) => id !== titleId),
    });
  };

  return (
    <Content>
      <Row>
        <EditFormCol>
          <Title>Lecturer information</Title>
          <EditForm
            lecturer={lecturer}
            isPending={isEditFormPending}
            onEdit={editLecturer}
            onResend={onResend}
          />
        </EditFormCol>
        <EditDepartmentsCol>
          <Title>Department positions</Title>
          <EditDepartments
            lecturer={lecturer}
            departments={departments}
            isPending={isEditFormPending}
            onDelete={onDeleteFromDepartment}
            onAdd={() => setIsAddDepartmentModalVisible(true)}
            onDetails={onDepartmentDetails}
          />
        </EditDepartmentsCol>
        <EditAcademicTitleCol>
          <Title>Academic titles</Title>
          <EditAcademicTitle
            lecturer={lecturer}
            academicTitles={academicTitles}
            isPending={isEditFormPending}
            onAdd={onAddAcademicTitle}
            onDelete={onDeleteAcademicTitle}
          />
        </EditAcademicTitleCol>
      </Row>
      <Actions>
        <BackButton onClick={onBack} />
        <DeleteButton disabled={isDeletePending} onClick={onDelete}>
          Delete lecturer
        </DeleteButton>
      </Actions>

      <Modal
        open={isAddDepartmentModalVisible}
        onClose={() => setIsAddDepartmentModalVisible(false)}
      >
        <AddLecturerDepartment
          lecturer={lecturer}
          departments={departments}
          isPending={isEditFormPending}
          onAdd={onAddToDepartment}
          onBack={() => setIsAddDepartmentModalVisible(false)}
        />
      </Modal>
      <Modal
        open={!!departmentForDetails}
        onClose={() => setDepartmentIdForDetails(null)}
      >
        <LecturerDepartmentDetails
          department={departmentForDetails as LecturerDepartment}
          isPending={isEditFormPending}
          onEdit={onEditLecturerDepartment}
          onDelete={onDeleteFromDepartment}
          onBack={() => setDepartmentIdForDetails(null)}
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

export default LecturerDetails;
