import { Lecturer, LecturerId } from '@/lecturers/entities';
import { Root, Toolbar, Table } from './styles';
import {
  useDeleteLecturers,
  useLecturersQuery,
  useResendLecturersInvites,
} from '@/lecturers/hooks';
import { useMemo, useState } from 'react';
import { AddLecturerModal, EditLecturerModal } from '@/lecturers/ui/components';
import { useDepartmentsQuery } from '@/departments/hooks';

const Lecturers = () => {
  const { lecturers } = useLecturersQuery();
  const { departments } = useDepartmentsQuery();
  const { deleteLecturers } = useDeleteLecturers();
  const { resendLecturersInvites } = useResendLecturersInvites();

  const [selectedLecturers, setSelectedLecturers] = useState<Lecturer[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedLecturersIds = useMemo<LecturerId[]>(() => {
    return selectedLecturers.map((lecturer) => lecturer.id);
  }, [selectedLecturers]);

  const onDelete = () => {
    if (!selectedLecturersIds.length) return;

    deleteLecturers(selectedLecturersIds);
  };

  const onResend = () => {
    if (!selectedLecturersIds.length) return;

    resendLecturersInvites(selectedLecturersIds);
  };

  const onEdit = () => {
    setIsEditModalVisible(true);
  };

  return (
    <Root>
      <Toolbar
        selectedLecturers={selectedLecturers}
        onAdd={() => setIsAddModalVisible(true)}
        onResend={onResend}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Table data={lecturers} onLecturersSelected={setSelectedLecturers} />

      <AddLecturerModal
        open={isAddModalVisible}
        departments={departments}
        onClose={() => setIsAddModalVisible(false)}
      />
      <EditLecturerModal
        open={isEditModalVisible}
        lecturer={selectedLecturers[0]}
        departments={departments}
        onClose={() => setIsEditModalVisible(false)}
      />
    </Root>
  );
};

export default Lecturers;
