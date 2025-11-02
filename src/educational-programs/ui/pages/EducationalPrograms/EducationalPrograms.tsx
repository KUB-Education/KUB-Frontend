import { Root, Toolbar } from './styles';
import { useMemo, useState } from 'react';
import { Modal } from '@/common/ui/components';
import { AddStudyField, StudyFieldDetails } from '@/study-fields/ui/components';
import { StudyField, StudyFieldId } from '@/study-fields/entities';
import { useDeleteStudyFields, useStudyFields } from '@/study-fields/hooks';
import {
  AddEducationalProgram,
  EducationalProgramCombinedTable,
  EducationalProgramDetails,
} from '@/educational-programs/ui/components';
import {
  useDeleteSpecialities,
  useStudyFieldSpecialities,
} from '@/specialities/hooks';
import {
  useDeleteEducationalPrograms,
  useSpecialityEducationalPrograms,
} from '@/educational-programs/hooks';
import { AddSpeciality, SpecialityDetails } from '@/specialities/ui/components';
import { Speciality, SpecialityId } from '@/specialities/entities';
import {
  EducationalProgram,
  EducationalProgramId,
} from '@/educational-programs/entities';

const EducationalPrograms = () => {
  const {
    studyFields,
    isFetching: isStudyFieldsFetching,
    isError: isStudyFieldsError,
  } = useStudyFields();
  const { deleteStudyFields } = useDeleteStudyFields();
  const [selectedStudyFieldIds, setSelectedStudyFieldIds] = useState<
    StudyFieldId[]
  >([]);
  const selectedStudyFields = useMemo<StudyField[]>(() => {
    return studyFields.reduce((acc: Array<StudyField>, studyField) => {
      return selectedStudyFieldIds.includes(studyField.id)
        ? [...acc, studyField]
        : acc;
    }, []);
  }, [studyFields, selectedStudyFieldIds]);

  const {
    specialities,
    isFetching: isSpecialitiesFetching,
    isError: isSpecialitiesError,
  } = useStudyFieldSpecialities({
    studyFieldId: selectedStudyFieldIds[0],
    enabled: !!selectedStudyFieldIds[0],
  });
  const { deleteSpecialities } = useDeleteSpecialities();
  const [selectedSpecialityIds, setSelectedSpecialityIds] = useState<
    SpecialityId[]
  >([]);
  const selectedSpecialities = useMemo<Speciality[]>(() => {
    return specialities.reduce((acc: Array<Speciality>, speciality) => {
      return selectedSpecialityIds.includes(speciality.id)
        ? [...acc, speciality]
        : acc;
    }, []);
  }, [specialities, selectedSpecialityIds]);

  const {
    educationalPrograms,
    isFetching: isEducationalProgramsFetching,
    isError: isEducationalProgramsError,
  } = useSpecialityEducationalPrograms({
    specialityId: selectedSpecialityIds[0],
    enabled: !!selectedSpecialityIds[0],
  });
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

  const [isAddStudyFieldModalVisible, setIsAddStudyFieldModalVisible] =
    useState(false);
  const [isStudyFieldDetailsModalVisible, setIsStudyFieldDetailsModalVisible] =
    useState(false);
  const [isAddSpecialityModalVisible, setIsAddSpecialityModalVisible] =
    useState(false);
  const [isSpecialityDetailsModalVisible, setIsSpecialityDetailsModalVisible] =
    useState(false);
  const [
    isAddEducationalProgramModalVisible,
    setIsAddEducationalProgramModalVisible,
  ] = useState(false);
  const [
    isEducationalProgramDetailsModalVisible,
    setIsEducationalProgramDetailsModalVisible,
  ] = useState(false);

  const onStudyFieldSelected = (studyFields: Array<StudyField>) => {
    const studyFieldIds = studyFields.map((studyField) => studyField.id);
    setSelectedStudyFieldIds(studyFieldIds);
  };

  const onSpecialitySelected = (specialities: Array<Speciality>) => {
    const specialityIds = specialities.map((speciality) => speciality.id);
    setSelectedSpecialityIds(specialityIds);
  };

  const onEducationalProgramSelected = (
    educationalPrograms: Array<EducationalProgram>,
  ) => {
    const educationalProgramIds = educationalPrograms.map(
      (educationalProgram) => educationalProgram.id,
    );
    setSelectedEducationalProgramIds(educationalProgramIds);
  };

  const onDeleteStudyFields = () => {
    if (!selectedStudyFields.length) return;

    deleteStudyFields(selectedStudyFieldIds);
  };

  const onDeleteSpecialities = () => {
    if (!selectedSpecialityIds.length) return;

    deleteSpecialities(selectedSpecialityIds);
  };

  const onDeleteEducationPrograms = () => {
    if (!selectedEducationalProgramIds.length) return;

    deleteEducationalPrograms(selectedEducationalProgramIds);
  };

  return (
    <Root>
      <Toolbar
        selectedStudyFields={selectedStudyFields}
        selectedSpecialities={selectedSpecialities}
        selectedEducationalPrograms={selectedEducationalPrograms}
        onAddStudyField={() => setIsAddStudyFieldModalVisible(true)}
        onDeleteStudyField={onDeleteStudyFields}
        onStudyFieldDetails={() => setIsStudyFieldDetailsModalVisible(true)}
        onAddSpeciality={() => setIsAddSpecialityModalVisible(true)}
        onDeleteSpeciality={onDeleteSpecialities}
        onSpecialityDetails={() => setIsSpecialityDetailsModalVisible(true)}
        onAddEducationalProgram={() =>
          setIsAddEducationalProgramModalVisible(true)
        }
        onDeleteEducationalProgram={onDeleteEducationPrograms}
        onEducationalProgramDetails={() =>
          setIsEducationalProgramDetailsModalVisible(true)
        }
      />
      <EducationalProgramCombinedTable
        studyFields={studyFields}
        specialities={specialities}
        educationalPrograms={educationalPrograms}
        isStudyFieldsFetching={isStudyFieldsFetching}
        isStudyFieldsError={isStudyFieldsError}
        isSpecialitiesFetching={isSpecialitiesFetching}
        isSpecialitiesError={isSpecialitiesError}
        isEducationalProgramsFetching={isEducationalProgramsFetching}
        isEducationalProgramsError={isEducationalProgramsError}
        onStudyFieldSelected={onStudyFieldSelected}
        onSpecialitySelected={onSpecialitySelected}
        onEducationalProgramSelected={onEducationalProgramSelected}
      />

      <Modal
        open={isAddStudyFieldModalVisible}
        onClose={() => setIsAddStudyFieldModalVisible(false)}
      >
        <AddStudyField
          onBack={() => setIsAddStudyFieldModalVisible(false)}
          onSucceed={() => setIsAddStudyFieldModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isStudyFieldDetailsModalVisible}
        onClose={() => setIsStudyFieldDetailsModalVisible(false)}
      >
        <StudyFieldDetails
          studyField={selectedStudyFields[0]}
          onBack={() => setIsStudyFieldDetailsModalVisible(false)}
          onSucceed={() => setIsStudyFieldDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsStudyFieldDetailsModalVisible(false)}
        />
      </Modal>

      <Modal
        open={isAddSpecialityModalVisible}
        onClose={() => setIsAddSpecialityModalVisible(false)}
      >
        <AddSpeciality
          studyField={selectedStudyFields[0]}
          onBack={() => setIsAddSpecialityModalVisible(false)}
          onSucceed={() => setIsAddSpecialityModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isSpecialityDetailsModalVisible}
        onClose={() => setIsSpecialityDetailsModalVisible(false)}
      >
        <SpecialityDetails
          speciality={selectedSpecialities[0]}
          onBack={() => setIsSpecialityDetailsModalVisible(false)}
          onSucceed={() => setIsSpecialityDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsSpecialityDetailsModalVisible(false)}
        />
      </Modal>

      <Modal
        open={isAddEducationalProgramModalVisible}
        onClose={() => setIsAddEducationalProgramModalVisible(false)}
      >
        <AddEducationalProgram
          speciality={selectedSpecialities[0]}
          onBack={() => setIsAddEducationalProgramModalVisible(false)}
          onSucceed={() => setIsAddEducationalProgramModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isEducationalProgramDetailsModalVisible}
        onClose={() => setIsEducationalProgramDetailsModalVisible(false)}
      >
        <EducationalProgramDetails
          educationalProgram={selectedEducationalPrograms[0]}
          onBack={() => setIsEducationalProgramDetailsModalVisible(false)}
          onSucceed={() => setIsEducationalProgramDetailsModalVisible(false)}
          onDeleteSucceed={() =>
            setIsEducationalProgramDetailsModalVisible(false)
          }
        />
      </Modal>
    </Root>
  );
};

export default EducationalPrograms;
