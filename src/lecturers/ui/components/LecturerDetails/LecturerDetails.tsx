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
  EditDepartmentPositions,
  EditAcademicTitles,
  EditAcademicTitlesCol,
  EditDepartmentPositionsCol,
  EditFormCol,
} from './styles.tsx';
import {
  AcademicTitleId,
  AddDepartmentPositionParams,
  EditDepartmentPositionParams,
  Lecturer,
  LecturerDepartmentPosition,
  LecturerDepartmentPositionId,
} from '@/lecturers/entities';
import {
  useAcademicTitles,
  useAddAcademicTitle,
  useAddDepartmentPosition,
  useDeleteAcademicTitle,
  useDeleteDepartmentPosition,
  useDeleteLecturers,
  useEditLecturer,
  useEditDepartmentPosition,
  usePositions,
  useResendLecturersInvites,
} from '@/lecturers/hooks';
import { DepartmentId } from '@/departments/entities';
import { useMemo, useState } from 'react';
import AddDepartmentPosition from '../AddDepartmentPosition';
import DepartmentPositionDetails from '../DepartmentPositionDetails';
import { useDepartments } from '@/departments/hooks';

export type LecturerDetailsModalProps = {
  lecturer: Lecturer;
  onBack: () => void;
  onDeleteSucceed: () => void;
};

const LecturerDetails = ({
  lecturer,
  onBack,
  onDeleteSucceed,
}: LecturerDetailsModalProps) => {
  const onError = () => {
    setIsErrorModalVisible(true);
  };

  const [isAddDepartmentModalVisible, setIsAddDepartmentModalVisible] =
    useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [departmentPositionIdForDetails, setDepartmentPositionIdForDetails] =
    useState<DepartmentId | null>(null);

  const { departments } = useDepartments();
  const { academicTitles } = useAcademicTitles();
  const { positions } = usePositions();

  const {
    editLecturer,
    isPending: isEditPending,
    error: editLecturerError,
  } = useEditLecturer({ onError });
  const {
    deleteLecturers,
    isPending: isDeletePending,
    error: deleteLecturerError,
  } = useDeleteLecturers({
    onSuccess: onDeleteSucceed,
    onError,
  });
  const {
    resendLecturersInvites,
    isPending: isResendPending,
    error: resendInvitesError,
  } = useResendLecturersInvites({ onError });

  const {
    addDepartmentPosition,
    isPending: isAddPositionPending,
    error: addPositionError,
  } = useAddDepartmentPosition({
    onSuccess: () => setIsAddDepartmentModalVisible(false),
    onError,
  });
  const {
    editDepartmentPosition,
    isPending: isEditPositionPending,
    error: editPositionError,
  } = useEditDepartmentPosition({
    onSuccess: () => setDepartmentPositionIdForDetails(null),
    onError,
  });
  const {
    deleteDepartmentPosition,
    isPending: isDeletePositionPending,
    error: deletePositionError,
  } = useDeleteDepartmentPosition({ onError });
  const {
    deleteAcademicTitle,
    isPending: isDeleteTitlePending,
    error: deleteTitleError,
  } = useDeleteAcademicTitle({ onError });
  const {
    addAcademicTitle,
    isPending: isAddTitlePending,
    error: addTitleError,
  } = useAddAcademicTitle({ onError });

  const isEditFormPending = useMemo(() => {
    return [
      isDeletePending,
      isEditPending,
      isResendPending,
      isAddPositionPending,
      isEditPositionPending,
      isDeletePositionPending,
      isDeleteTitlePending,
      isAddTitlePending,
    ].some(Boolean);
  }, [
    isDeletePending,
    isEditPending,
    isResendPending,
    isAddPositionPending,
    isEditPositionPending,
    isDeletePositionPending,
    isDeleteTitlePending,
    isAddTitlePending,
  ]);

  const error = useMemo(() => {
    const errors = [
      editLecturerError,
      deleteLecturerError,
      resendInvitesError,
      addPositionError,
      editPositionError,
      deletePositionError,
      addTitleError,
      deleteTitleError,
    ].filter(Boolean);

    return errors[0];
  }, [
    editLecturerError,
    deleteLecturerError,
    resendInvitesError,
    addPositionError,
    editPositionError,
    deletePositionError,
    addTitleError,
    deleteTitleError,
  ]);

  const departmentPositionForDetails = useMemo(() => {
    return lecturer.departmentPositions.find(
      (department) => department.id === departmentPositionIdForDetails,
    );
  }, [lecturer, departmentPositionIdForDetails]);

  const onDeleteLecturer = () => {
    deleteLecturers([lecturer.id]);
  };

  const onResend = () => {
    resendLecturersInvites([lecturer.id]);
  };

  const onAddDepartmentPosition = (params: AddDepartmentPositionParams) => {
    addDepartmentPosition(params);
  };

  const onDeleteDepartmentPosition = (
    departmentPositionId: LecturerDepartmentPositionId,
  ) => {
    deleteDepartmentPosition({ lecturerId: lecturer.id, departmentPositionId });
  };

  const onDepartmentPositionDetails = (departmentId: DepartmentId) => {
    setDepartmentPositionIdForDetails(departmentId);
  };

  const onEditDepartmentPosition = (
    data: Omit<EditDepartmentPositionParams, 'lecturerId'>,
  ) => {
    editDepartmentPosition({
      lecturerId: lecturer.id,
      ...data,
    });
  };

  const onAddAcademicTitle = (titleId: AcademicTitleId) => {
    addAcademicTitle({ lecturerId: lecturer.id, academicTitleId: titleId });
  };

  const onDeleteAcademicTitle = (titleId: AcademicTitleId) => {
    deleteAcademicTitle({ lecturerId: lecturer.id, academicTitleId: titleId });
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
        <EditDepartmentPositionsCol>
          <Title>Department positions</Title>
          <EditDepartmentPositions
            lecturer={lecturer}
            departments={departments}
            isPending={isEditFormPending}
            onDelete={onDeleteDepartmentPosition}
            onAdd={() => setIsAddDepartmentModalVisible(true)}
            onDetails={onDepartmentPositionDetails}
          />
        </EditDepartmentPositionsCol>
        <EditAcademicTitlesCol>
          <Title>Academic titles</Title>
          <EditAcademicTitles
            lecturer={lecturer}
            academicTitles={academicTitles}
            isPending={isEditFormPending}
            onAdd={onAddAcademicTitle}
            onDelete={onDeleteAcademicTitle}
          />
        </EditAcademicTitlesCol>
      </Row>
      <Actions>
        <BackButton onClick={onBack} />
        <DeleteButton disabled={isDeletePending} onClick={onDeleteLecturer}>
          Delete lecturer
        </DeleteButton>
      </Actions>

      <Modal
        open={isAddDepartmentModalVisible}
        onClose={() => setIsAddDepartmentModalVisible(false)}
      >
        <AddDepartmentPosition
          lecturer={lecturer}
          departments={departments}
          positions={positions}
          isPending={isEditFormPending}
          onAdd={onAddDepartmentPosition}
          onBack={() => setIsAddDepartmentModalVisible(false)}
        />
      </Modal>
      <Modal
        open={!!departmentPositionForDetails}
        onClose={() => setDepartmentPositionIdForDetails(null)}
      >
        <DepartmentPositionDetails
          departmentPosition={
            departmentPositionForDetails as LecturerDepartmentPosition
          }
          positions={positions}
          isPending={isEditFormPending}
          onEdit={onEditDepartmentPosition}
          onDelete={onDeleteDepartmentPosition}
          onBack={() => setDepartmentPositionIdForDetails(null)}
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
