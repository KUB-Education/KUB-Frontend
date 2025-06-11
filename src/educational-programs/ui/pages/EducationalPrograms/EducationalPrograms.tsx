import { GrouppedData } from '@/common/entities';
import {
  EducationalProgram,
  Specialty,
  StudyField,
} from '@/educational-programs/entities';
import { Root, Toolbar } from './styles';
import {
  useDeleteEducationPrograms,
  useEducationalProgramsQuery,
} from '@/educational-programs/hooks';
import { useMemo, useState } from 'react';
import {
  EditEducationalProgramModal,
  EducationalProgramsTable,
  AddEducationalProgramModal,
  EditSpecialtyModal,
  AddSpecialtyModal,
  EditStudyFieldModal,
  AddStudyFieldModal,
} from '@/educational-programs/ui/components';

type GrouppedEPData = GrouppedData<StudyField, Specialty, EducationalProgram>;

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
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
    setIsEditModalVisible(true);
  };

  const handleStudyFieldsSelected = (data: Array<StudyField>) => {
    setSelectedStudyFields(
      data.map((item) => ({
        data1: item,
      })),
    );
  };

  const handleSpecialtiesSelected = (
    studyField: StudyField,
    data: Array<Specialty>,
  ) => {
    setSelectedSpecialties(
      data.map((item) => ({
        data1: studyField,
        data2: item,
      })),
    );
  };

  const handleEducationalProgramsSelected = (
    studyField: StudyField,
    specialty: Specialty,
    data: Array<EducationalProgram>,
  ) => {
    setSelectedEducationalPrograms(
      data.map((item) => ({
        data1: studyField,
        data2: specialty,
        data3: item,
      })),
    );
  };

  const isEditEducationalModalVisible = useMemo(() => {
    return !!selectedEducationalPrograms.length && isEditModalVisible;
  }, [selectedEducationalPrograms, isEditModalVisible]);
  const isEditSpecialtyModalVisible = useMemo(() => {
    return (
      isEditModalVisible &&
      !isEditEducationalModalVisible &&
      !!selectedSpecialties.length
    );
  }, [selectedSpecialties, isEditModalVisible, isEditEducationalModalVisible]);
  const isEditStudyFieldModalVisible = useMemo(() => {
    return (
      isEditModalVisible &&
      !isEditEducationalModalVisible &&
      !isEditSpecialtyModalVisible &&
      !!selectedStudyFields.length
    );
  }, [
    isEditModalVisible,
    isEditEducationalModalVisible,
    isEditSpecialtyModalVisible,
    selectedStudyFields.length,
  ]);

  const isAddSpecialtyModalVisible = useMemo(() => {
    return isAddModalVisible && !!selectedStudyFields.length;
  }, [selectedStudyFields, isAddModalVisible]);

  const isAddEducationalModalVisible = useMemo(() => {
    return (
      isAddModalVisible &&
      !isAddSpecialtyModalVisible &&
      !!selectedSpecialties.length
    );
  }, [
    isAddModalVisible,
    isAddSpecialtyModalVisible,
    selectedSpecialties.length,
  ]);

  const isAddStudyFieldModalVisible = useMemo(() => {
    return (
      isAddModalVisible &&
      !isAddSpecialtyModalVisible &&
      !isAddEducationalModalVisible
    );
  }, [
    isAddModalVisible,
    isAddSpecialtyModalVisible,
    isAddEducationalModalVisible,
  ]);

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
        onAdd={() => setIsAddModalVisible(true)}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <EducationalProgramsTable
        data={[...educationalPrograms]}
        onStudyFieldsSelected={handleStudyFieldsSelected}
        onSpecialtiesSelected={handleSpecialtiesSelected}
        onEducationalProgramsSelected={handleEducationalProgramsSelected}
      />

      <EditEducationalProgramModal
        open={isEditEducationalModalVisible}
        educationalProgram={selectedItems[0]?.data3}
        onClose={() => setIsEditModalVisible(false)}
      />
      <AddEducationalProgramModal
        open={isAddEducationalModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />

      <EditSpecialtyModal
        open={isEditSpecialtyModalVisible}
        specialty={selectedItems[0]?.data2}
        onClose={() => setIsEditModalVisible(false)}
      />
      <AddSpecialtyModal
        open={isAddSpecialtyModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />

      <EditStudyFieldModal
        open={isEditStudyFieldModalVisible}
        studyField={selectedItems[0]?.data1}
        onClose={() => setIsEditModalVisible(false)}
      />
      <AddStudyFieldModal
        open={isAddStudyFieldModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
    </Root>
  );
};

export default EducationalPrograms;
