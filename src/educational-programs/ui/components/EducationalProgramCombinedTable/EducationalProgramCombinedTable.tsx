import {
  CombinedTable,
  TermsTable,
  SubjectsTable,
  SubjectActivitiesTable,
} from './styles';
import { Term } from '@/terms/entities';
import { Subject } from '@/subjects/entities';
import { SubjectActivity } from '@/subject-activities/entities';

export type EducationalProgramCombinedTableProps = {
  terms: Term[];
  subjects: Subject[];
  subjectActivities: SubjectActivity[];
  isTermsFetching: boolean;
  isTermsError: boolean;
  isSubjectsFetching: boolean;
  isSubjectsError: boolean;
  isSubjectActivitiesFetching: boolean;
  isSubjectActivitiesError: boolean;
  onTermsSelected: (terms: Term[]) => void;
  onSubjectsSelected: (subjects: Subject[]) => void;
  onSubjectActivitiesSelected: (subjectActivities: SubjectActivity[]) => void;
};

const EducationalProgramCombinedTable = ({
  terms,
  subjects,
  subjectActivities,
  isTermsFetching,
  isTermsError,
  isSubjectsFetching,
  isSubjectsError,
  isSubjectActivitiesFetching,
  isSubjectActivitiesError,
  onTermsSelected,
  onSubjectsSelected,
  onSubjectActivitiesSelected,
}: EducationalProgramCombinedTableProps) => {
  return (
    <CombinedTable>
      <TermsTable
        data={terms}
        isLoading={isTermsFetching}
        isError={isTermsError}
        onTermsSelected={onTermsSelected}
      />
      <SubjectsTable
        data={subjects}
        isLoading={isSubjectsFetching}
        isError={isSubjectsError}
        onSubjectsSelected={onSubjectsSelected}
      />
      <SubjectActivitiesTable
        data={subjectActivities}
        isLoading={isSubjectActivitiesFetching}
        isError={isSubjectActivitiesError}
        onSubjectActivitiesSelected={onSubjectActivitiesSelected}
      />
    </CombinedTable>
  );
};

export default EducationalProgramCombinedTable;
