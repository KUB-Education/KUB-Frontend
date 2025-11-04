import { Root, Toolbar } from './styles';
import { useMemo, useState } from 'react';
import { Modal } from '@/common/ui/components';
import {
  AddEducationalProgram,
  EducationalProgramDetails,
  EducationalProgramTable,
} from '@/educational-programs/ui/components';
import {
  useDeleteEducationalPrograms,
  useEducationalPrograms,
} from '@/educational-programs/hooks';
import {
  EducationalProgram,
  EducationalProgramId,
} from '@/educational-programs/entities';
import { useSpecialities } from '@/specialities/hooks';

const EducationalPrograms = () => {
  const { educationalPrograms, isFetching, isError } = useEducationalPrograms();
  const { specialities } = useSpecialities();
  const { deleteEducationalPrograms } = useDeleteEducationalPrograms();

  const [selectedEducationalProgramIds, setSelectedEducationalProgramIds] =
    useState<EducationalProgramId[]>([]);
  const selectedEducationalPrograms = useMemo<EducationalProgram[]>(() => {
    return educationalPrograms.reduce(
      (acc: Array<EducationalProgram>, educationalProgram) => {
        return selectedEducationalProgramIds.includes(educationalProgram.id)
          ? [...acc, educationalProgram]
          : acc;
      },
      [],
    );
  }, [educationalPrograms, selectedEducationalProgramIds]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const onEducationalProgramSelected = (
    educationalPrograms: Array<EducationalProgram>,
  ) => {
    const educationalProgramIds = educationalPrograms.map(
      (educationalProgram) => educationalProgram.id,
    );
    setSelectedEducationalProgramIds(educationalProgramIds);
  };

  const onDeleteEducationPrograms = () => {
    if (!selectedEducationalProgramIds.length) return;

    deleteEducationalPrograms(selectedEducationalProgramIds);
  };

  return (
    <Root>
      <Toolbar
        selectedEducationalPrograms={selectedEducationalPrograms}
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDeleteEducationPrograms}
        onDetails={() => setIsDetailsModalVisible(true)}
      />
      <EducationalProgramTable
        data={educationalPrograms}
        onEducationalProgramSelected={onEducationalProgramSelected}
        isLoading={isFetching}
        isError={isError}
      />

      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      >
        <AddEducationalProgram
          specialities={specialities}
          onBack={() => setIsAddModalVisible(false)}
          onSucceed={() => setIsAddModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
      >
        <EducationalProgramDetails
          educationalProgram={selectedEducationalPrograms[0]}
          specialities={specialities}
          onBack={() => setIsDetailsModalVisible(false)}
          onSucceed={() => setIsDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsDetailsModalVisible(false)}
        />
      </Modal>
    </Root>
  );
};

export default EducationalPrograms;
