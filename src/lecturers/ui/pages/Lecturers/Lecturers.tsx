import { Lecturer, LecturerId } from '@/lecturers/entities';
import { Root, Toolbar, Table } from './styles';
import {
  useAcademicTitles,
  useDeleteLecturers,
  useLecturersQuery,
  useResendLecturersInvites,
} from '@/lecturers/hooks';
import { useMemo, useState } from 'react';
import { AddLecturer, LecturerDetails } from '@/lecturers/ui/components';
import { useDepartmentsQuery } from '@/departments/hooks';
import { Modal } from '@/common/ui/components';
import { getUserId } from '@/users/entities';

const Lecturers = () => {
  const { lecturers } = useLecturersQuery();
  const { departments } = useDepartmentsQuery();
  const { academicTitles } = useAcademicTitles();
  const { deleteLecturers } = useDeleteLecturers();
  const { resendLecturersInvites } = useResendLecturersInvites();

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
    const lecturerIds = selectedLecturers.map(getUserId);
    setSelectedLecturersIds(lecturerIds);
  };

  const onDelete = () => {
    if (!selectedLecturersIds.length) return;

    deleteLecturers(selectedLecturersIds);
  };

  const onResend = () => {
    if (!selectedLecturersIds.length) return;

    resendLecturersInvites(selectedLecturersIds);
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
          onSuccess={() => setIsAddModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
      >
        <LecturerDetails
          lecturer={selectedLecturers[0]}
          departments={departments}
          academicTitles={academicTitles}
          onDeleteSucceed={() => setIsDetailsModalVisible(false)}
          onBack={() => setIsDetailsModalVisible(false)}
        />
      </Modal>
    </Root>
  );
};

export default Lecturers;
