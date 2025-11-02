import {
  CombinedTable,
  EducationalProgramTable,
  SpecialitiesTable,
  StudyFieldsTable,
} from './styles';
import { StudyField } from '@/study-fields/entities';
import { Speciality } from '@/specialities/entities';
import { EducationalProgram } from '@/educational-programs/entities';

export type EducationalProgramCombinedTableProps = {
  studyFields: StudyField[];
  specialities: Speciality[];
  educationalPrograms: EducationalProgram[];
  isStudyFieldsFetching: boolean;
  isStudyFieldsError: boolean;
  isSpecialitiesFetching: boolean;
  isSpecialitiesError: boolean;
  isEducationalProgramsFetching: boolean;
  isEducationalProgramsError: boolean;
  onStudyFieldSelected: (studyField: StudyField[]) => void;
  onSpecialitySelected: (speciality: Speciality[]) => void;
  onEducationalProgramSelected: (
    educationalProgram: EducationalProgram[],
  ) => void;
};

const EducationalProgramCombinedTable = ({
  studyFields,
  specialities,
  educationalPrograms,
  isStudyFieldsFetching,
  isStudyFieldsError,
  isSpecialitiesFetching,
  isSpecialitiesError,
  isEducationalProgramsError,
  isEducationalProgramsFetching,
  onStudyFieldSelected,
  onSpecialitySelected,
  onEducationalProgramSelected,
}: EducationalProgramCombinedTableProps) => {
  return (
    <CombinedTable>
      <StudyFieldsTable
        data={studyFields}
        onStudyFieldSelected={onStudyFieldSelected}
        isLoading={isStudyFieldsFetching}
        isError={isStudyFieldsError}
      />
      <SpecialitiesTable
        data={specialities}
        onSpecialitySelected={onSpecialitySelected}
        isLoading={isSpecialitiesFetching}
        isError={isSpecialitiesError}
      />
      <EducationalProgramTable
        data={educationalPrograms}
        onEducationalProgramSelected={onEducationalProgramSelected}
        isLoading={isEducationalProgramsFetching}
        isError={isEducationalProgramsError}
      />
    </CombinedTable>
  );
};

export default EducationalProgramCombinedTable;
