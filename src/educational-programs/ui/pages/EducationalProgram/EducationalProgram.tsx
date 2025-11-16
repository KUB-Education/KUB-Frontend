import { Root, Toolbar, Loader } from './styles';
import { useDeleteTerms, useTerms } from '@/terms/hooks';
import { useMemo, useState } from 'react';
import { AddTerm, TermDetails } from '@/terms/ui/components';
import { Term, TermId } from '@/terms/entities';
import { AddSubject, SubjectDetails } from '@/subjects/ui/components';
import { useDeleteSubjects, useSubjectsByTerm } from '@/subjects/hooks';
import { Subject, SubjectId } from '@/subjects/entities';
import {
  SubjectActivity,
  SubjectActivityId,
} from '@/subject-activities/entities';
import {
  useDeleteSubjectActivities,
  useSubjectActivities,
} from '@/subject-activities/hooks';
import {
  AddSubjectActivity,
  SubjectActivityDetails,
} from '@/subject-activities/ui/components';
import { Modal } from '@/common/ui/components';
import { EducationalProgramCombinedTable } from '@/educational-programs/ui/components';
import { useEducationalProgram } from './useEducationalProgram';

const EducationalProgram = () => {
  const { educationalProgramId, educationalProgram } = useEducationalProgram();

  const [isAddTermModalVisible, setIsAddTermModalVisible] = useState(false);
  const [isTermDetailsModalVisible, setIsTermDetailsModalVisible] =
    useState(false);
  const [isAddSubjectModalVisible, setIsAddSubjectModalVisible] =
    useState(false);
  const [isSubjectDetailsModalVisible, setIsSubjectDetailsModalVisible] =
    useState(false);
  const [
    isAddSubjectActivityModalVisible,
    setIsAddSubjectActivityModalVisible,
  ] = useState(false);
  const [
    isSubjectActivityDetailsModalVisible,
    setIsSubjectActivityDetailsModalVisible,
  ] = useState(false);

  const [selectedTermIds, setSelectedTermIds] = useState<TermId[]>([]);
  const {
    terms,
    isError: isTermsError,
    isFetching: isTermsFetching,
  } = useTerms({
    educationalProgramId,
    enabled: !!educationalProgram,
  });
  const { deleteTerms } = useDeleteTerms();
  const selectedTerms = useMemo<Term[]>(() => {
    return terms.reduce((acc: Array<Term>, term) => {
      return selectedTermIds.includes(term.id) ? [...acc, term] : acc;
    }, []);
  }, [terms, selectedTermIds]);

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<SubjectId[]>([]);
  const {
    subjects,
    isFetching: isSubjectsFetching,
    isError: isSubjectError,
  } = useSubjectsByTerm({
    termId: selectedTermIds[0],
    enabled: !!selectedTermIds[0],
  });
  const { deleteSubjects } = useDeleteSubjects();
  const selectedSubjects = useMemo<Subject[]>(() => {
    return subjects.reduce((acc: Array<Subject>, subject) => {
      return selectedSubjectIds.includes(subject.id) ? [...acc, subject] : acc;
    }, []);
  }, [subjects, selectedSubjectIds]);

  const [selectedSubjectActivityIds, setSelectedSubjectActivityIds] = useState<
    SubjectActivityId[]
  >([]);
  const {
    subjectActivities,
    isFetching: isSubjectActivitiesFetching,
    isError: isSubjectActivitiesError,
  } = useSubjectActivities({
    subjectId: selectedSubjectIds[0],
    enabled: !!selectedSubjectIds[0],
  });
  const { deleteSubjectActivities } = useDeleteSubjectActivities();
  const selectedSubjectActivities = useMemo<SubjectActivity[]>(() => {
    return subjectActivities.reduce(
      (acc: Array<SubjectActivity>, subjectActivity) => {
        return selectedSubjectActivityIds.includes(subjectActivity.id)
          ? [...acc, subjectActivity]
          : acc;
      },
      [],
    );
  }, [subjectActivities, selectedSubjectActivityIds]);

  const onTermsSelected = (terms: Array<Term>) => {
    const termIds = terms.map((term) => term.id);
    setSelectedTermIds(termIds);
  };

  const onSubjectsSelected = (subjects: Array<Subject>) => {
    const subjectIds = subjects.map((subject) => subject.id);
    setSelectedSubjectIds(subjectIds);
  };

  const onSubjectActivitiesSelected = (
    subjectActivities: Array<SubjectActivity>,
  ) => {
    const subjectActivityIds = subjectActivities.map(
      (subjectActivity) => subjectActivity.id,
    );
    setSelectedSubjectActivityIds(subjectActivityIds);
  };

  const onDeleteTerms = () => {
    if (!selectedTermIds.length || !educationalProgram) return;

    deleteTerms({
      educationalProgramId: educationalProgram.id,
      termIds: selectedTermIds,
    });
  };

  const onDeleteSubjects = () => {
    if (!selectedSubjectIds.length || !selectedTermIds[0]) return;

    deleteSubjects({
      termId: selectedTermIds[0],
      subjectIds: selectedSubjectIds,
    });
  };

  const onDeleteSubjectActivities = () => {
    if (!selectedSubjectActivityIds.length || !selectedSubjectIds[0]) return;

    deleteSubjectActivities({
      subjectId: selectedSubjectIds[0],
      subjectActivityIds: selectedSubjectActivityIds,
    });
  };

  if (!educationalProgram) {
    return (
      <Root>
        <Loader />
      </Root>
    );
  }

  return (
    <Root>
      <Toolbar
        selectedTerms={selectedTerms}
        selectedSubjects={selectedSubjects}
        selectedSubjectActivities={selectedSubjectActivities}
        onAddTerm={() => setIsAddTermModalVisible(true)}
        onTermDetails={() => setIsTermDetailsModalVisible(true)}
        onDeleteTerm={onDeleteTerms}
        onAddSubject={() => setIsAddSubjectModalVisible(true)}
        onSubjectDetails={() => setIsSubjectDetailsModalVisible(true)}
        onDeleteSubject={onDeleteSubjects}
        onAddSubjectActivity={() => setIsAddSubjectActivityModalVisible(true)}
        onSubjectActivityDetails={() =>
          setIsSubjectActivityDetailsModalVisible(true)
        }
        onDeleteSubjectActivity={onDeleteSubjectActivities}
      />
      <EducationalProgramCombinedTable
        terms={terms}
        subjects={subjects}
        subjectActivities={subjectActivities}
        isTermsFetching={isTermsFetching}
        isTermsError={isTermsError}
        isSubjectsFetching={isSubjectsFetching}
        isSubjectsError={isSubjectError}
        isSubjectActivitiesFetching={isSubjectActivitiesFetching}
        isSubjectActivitiesError={isSubjectActivitiesError}
        onTermsSelected={onTermsSelected}
        onSubjectsSelected={onSubjectsSelected}
        onSubjectActivitiesSelected={onSubjectActivitiesSelected}
      />

      <Modal
        open={isAddTermModalVisible}
        onClose={() => setIsAddTermModalVisible(false)}
      >
        <AddTerm
          educationalProgramId={educationalProgramId}
          onBack={() => setIsAddTermModalVisible(false)}
          onSucceed={() => setIsAddTermModalVisible(false)}
        />
      </Modal>

      <Modal
        open={isTermDetailsModalVisible}
        onClose={() => setIsTermDetailsModalVisible(false)}
      >
        <TermDetails
          educationalProgram={educationalProgram}
          term={selectedTerms[0]}
          onBack={() => setIsTermDetailsModalVisible(false)}
          onSucceed={() => setIsTermDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsTermDetailsModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isAddSubjectModalVisible}
        onClose={() => setIsAddSubjectModalVisible(false)}
      >
        <AddSubject
          term={selectedTerms[0]}
          onBack={() => setIsAddSubjectModalVisible(false)}
          onSucceed={() => setIsAddSubjectModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isSubjectDetailsModalVisible}
        onClose={() => setIsSubjectDetailsModalVisible(false)}
      >
        <SubjectDetails
          term={selectedTerms[0]}
          subject={selectedSubjects[0]}
          onBack={() => setIsSubjectDetailsModalVisible(false)}
          onSucceed={() => setIsSubjectDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsSubjectDetailsModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isAddSubjectActivityModalVisible}
        onClose={() => setIsAddSubjectActivityModalVisible(false)}
      >
        <AddSubjectActivity
          subject={selectedSubjects[0]}
          onBack={() => setIsAddSubjectActivityModalVisible(false)}
          onSucceed={() => setIsAddSubjectActivityModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isSubjectActivityDetailsModalVisible}
        onClose={() => setIsSubjectActivityDetailsModalVisible(false)}
      >
        <SubjectActivityDetails
          subject={selectedSubjects[0]}
          subjectActivity={selectedSubjectActivities[0]}
          onBack={() => setIsSubjectActivityDetailsModalVisible(false)}
          onSucceed={() => setIsSubjectActivityDetailsModalVisible(false)}
          onDeleteSucceed={() => setIsSubjectActivityDetailsModalVisible(false)}
        />
      </Modal>
    </Root>
  );
};

export default EducationalProgram;
