import { EducationalProgram, EducationalProgramId, } from '@/educational-programs/entities';
import { Root, Toolbar, Table } from './styles';
import {
  useDeleteEducationalPrograms,
  useEducationalProgramsQuery,
} from '@/educational-programs/hooks';
import { useMemo, useState } from 'react';
import { AddEducationalProgramModal, EditEducationalProgramModal } from '@/educational-programs/ui/components';

const EducationalPrograms = () => {
  const { educationalPrograms } = useEducationalProgramsQuery();
  const { deleteEducationalPrograms } = useDeleteEducationalPrograms();
  
  const [selectedEducationalPrograms, setEducationalPrograms] = useState<EducationalProgram[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const selectedEducationalProgramIds = useMemo<EducationalProgramId[]>(() => {
      return selectedEducationalPrograms.map((ep) => ep.id);
    }, [selectedEducationalPrograms]);

  const onDelete = () => {
    if (!selectedEducationalProgramIds.length) return;

    deleteEducationalPrograms(selectedEducationalProgramIds);
  };

  const onEdit = () => {
    setIsEditModalVisible(true);
  };


  return (
    <Root>
      <p>Educational Programs</p>
      <Toolbar
        selectedRooms={selectedEducationalPrograms}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Table data={educationalPrograms} onEducationalProgramsSelected={setEducationalPrograms} />

      <AddEducationalProgramModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
      <EditEducationalProgramModal
        open={isEditModalVisible}
        educationalProgram={selectedEducationalPrograms[0]}
        onClose={() => setIsEditModalVisible(false)}/>
    </Root>
  );
};

export default EducationalPrograms;
