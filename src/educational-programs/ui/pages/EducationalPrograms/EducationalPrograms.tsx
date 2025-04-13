import { EducationalProgram, EPId, } from '@/educational-programs/entities';
import { Root, Toolbar, Table } from './styles';
import {
  useDeleteEPs,
  useEPsQuery,
} from '@/educational-programs/hooks';
import { useMemo, useState } from 'react';
import { AddEPModal, EditEPModal } from '@/educational-programs/ui/components';

const EducationalPrograms = () => {
  const { educationalPrograms } = useEPsQuery();
  const { deleteEducationalPrograms } = useDeleteEPs();
  
  const [selectedEPs, setEPs] = useState<EducationalProgram[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedEPIds = useMemo<EPId[]>(() => {
      return selectedEPs.map((ep) => ep.id);
    }, [selectedEPs]);

  const onDelete = () => {
    if (!selectedEPIds.length) return;

    deleteEducationalPrograms(selectedEPIds);
  };

  const onEdit = () => {
    setIsEditModalVisible(true);
  };


  return (
    <Root>
      <p>Educational Programs</p>
      <Toolbar
        selectedRooms={selectedEPs}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Table data={educationalPrograms} onEPsSelected={setEPs} />

      <AddEPModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
      <EditEPModal
        open={isEditModalVisible}
        educationalProgram={selectedEPs[0]}
        onClose={() => setIsEditModalVisible(false)}/>
    </Root>
  );
};

export default EducationalPrograms;
