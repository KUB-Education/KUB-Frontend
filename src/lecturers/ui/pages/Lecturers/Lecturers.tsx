import { Lecturer, LecturerId } from '@/lecturers/entities';
import { Root, Toolbar, Table } from './styles';
import { useDeleteLecturers, useLecturers } from '@/lecturers/hooks';
import { useMemo, useState } from 'react';
import { AddLecturer, LecturerDetails } from '@/lecturers/ui/components';
import { Modal } from '@/common/ui/components';
import { useResendUsersActivationEmail } from '@/users/hooks';

const Lecturers = () => {
  const { lecturers } = useLecturers();
  const { deleteLecturers } = useDeleteLecturers();
  const { resendUsersActivationEmail } = useResendUsersActivationEmail();

  const [selectedLecturersIds, setSelectedLecturersIds] = useState<
    LecturerId[]
  >([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const selectedLecturers = useMemo<Lecturer[]>(() => {
    return lecturers.reduce((acc: Array<Lecturer>, lecturer) => {
      return selectedLecturersIds.includes(lecturer.id)
        ? [...acc, lecturer]
        : acc;
    }, []);
  }, [lecturers, selectedLecturersIds]);

  const onLecturerSelected = (selectedLecturers: Array<Lecturer>) => {
    const lecturerIds = selectedLecturers.map((lecturer) => lecturer.id);
    setSelectedLecturersIds(lecturerIds);
  };

  const onDelete = () => {
    if (!selectedLecturersIds.length) return;

    deleteLecturers(selectedLecturersIds);
  };

  const onResend = () => {
    if (!selectedLecturers.length) return;
    const selectedUserIds = selectedLecturers.map(
      (lecturer) => lecturer.userId,
    );

    resendUsersActivationEmail(selectedUserIds);
  };

  const onDetails = () => {
    setIsDetailsModalVisible(true);
  };

  return (
    <Root>
      <Toolbar
        selectedLecturers={selectedLecturers}
        onAdd={() => setIsAddModalVisible(true)}
        onResend={onResend}
        onDelete={onDelete}
        onDetails={onDetails}
      />
      <Table data={lecturers} onLecturersSelected={onLecturerSelected} />

      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <AddLecturer
          onBack={() => setIsAddModalVisible(false)}
          onSucceed={() => setIsAddModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
      >
        <LecturerDetails
          lecturer={selectedLecturers[0]}
          onDeleteSucceed={() => setIsDetailsModalVisible(false)}
          onBack={() => setIsDetailsModalVisible(false)}
        />
      </Modal>
    </Root>
  );
};

export default Lecturers;
