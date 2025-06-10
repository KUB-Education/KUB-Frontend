import { GrouppedData } from '@/common/entities';
import { EducationalProgram } from '@/educational-programs/entities';
import { Root, Toolbar } from './styles';
import {
  useDeleteEducationPrograms,
  useEducationalProgramsQuery,
} from '@/educational-programs/hooks';
import { useMemo, useState } from 'react';
import {
  EducationalProgramModal,
  EducationalProgramsTable,
} from '@/educational-programs/ui/components';

type GrouppedEPData = GrouppedData<
  EducationalProgram['studyField'],
  EducationalProgram['specialty'],
  EducationalProgram['educationalProgram']
>;

const EducationalPrograms = () => {
  const { educationalPrograms } = useEducationalProgramsQuery();

  const { executeRequest: deleteEducationalPrograms } =
    useDeleteEducationPrograms();

  const [selectedStudyFields, setSelectedStudyFields] = useState<
    GrouppedEPData[]
  >([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<
    GrouppedEPData[]
  >([]);
  const [selectedEducationalPrograms, setSelectedEducationalPrograms] =
    useState<GrouppedEPData[]>([]);
  const [modalVisible, setModalVisible] = useState<
    'add' | 'edit' | undefined
  >();

  const selectedItems = useMemo(
    () => [
      ...selectedStudyFields,
      ...selectedSpecialties,
      ...selectedEducationalPrograms,
    ],
    [selectedStudyFields, selectedSpecialties, selectedEducationalPrograms],
  );

  const onDelete = () => {
    deleteEducationalPrograms(selectedItems);
  };

  const onEdit = () => {
    setModalVisible('edit');
  };

  const handleStudyFieldsSelected = (
    data: Array<EducationalProgram['studyField']>,
  ) => {
    setSelectedStudyFields(
      data.map((item) => ({
        data1: item,
      })),
    );
  };

  const handleSpecialtiesSelected = (
    studyField: EducationalProgram['studyField'],
    data: Array<EducationalProgram['specialty']>,
  ) => {
    setSelectedSpecialties(
      data.map((item) => ({
        data1: studyField,
        data2: item,
      })),
    );
  };

  const handleEducationalProgramsSelected = (
    studyField: EducationalProgram['studyField'],
    specialty: EducationalProgram['specialty'],
    data: Array<EducationalProgram['educationalProgram']>,
  ) => {
    setSelectedEducationalPrograms(
      data.map((item) => ({
        data1: studyField,
        data2: specialty,
        data3: item,
      })),
    );
  };

  return (
    <Root>
      <p>Educational Programs</p>
      <Toolbar
        selectedItems={selectedItems}
        buttonTexts={{
          addNewData1: 'Add new study field',
          addNewData2: 'Add new speciality',
          addNewData3: 'Add new educational program',
        }}
        onAdd={() => setModalVisible('add')}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <EducationalProgramsTable
        data={[...educationalPrograms]}
        onStudyFieldsSelected={handleStudyFieldsSelected}
        onSpecialtiesSelected={handleSpecialtiesSelected}
        onEducationalProgramsSelected={handleEducationalProgramsSelected}
      />

      <EducationalProgramModal
        open={!!modalVisible}
        educationalProgram={
          selectedItems.length
            ? { ...selectedItems[0] }
            : ({ data1: {} } as GrouppedEPData)
        }
        mode={modalVisible}
        onClose={() => setModalVisible(undefined)}
      />
    </Root>
  );
};

export default EducationalPrograms;
