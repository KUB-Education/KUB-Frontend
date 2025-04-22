import { GrouppedData } from '@/common/entities'
import { Root, Toolbar, Table } from './styles';
import { Subject } from '@/subjects/entities';
import {
  useSubjectsExecute,
  useSubjectsQuery,
} from '@/subjects/hooks';
import { useMemo, useState } from 'react';
import { SubjectModal, SubjectType, SubjectActivity, } from '@/subjects/ui/components';

type GrouppedSubjectData = GrouppedData<Subject["term"], Subject["subject"], Subject["subjectActivity"]>;

const termsColDefs = {
  headerName: "Term",
  children: [
    { field: "id", headerName: "ID" },
    { field: "number", headerName: "Number" },
  ]
};

const subjectColDefs = {
  headerName: "Subject",
  children: [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "type",
      headerName: "Type",
      cellRenderer: SubjectType,
    },
  ]
};

const subjectActivityColDefs = {
  headerName: "Subject Activity",
  children: [
    { field: "id", headerName: "ID" },
    {
      field: "type",
      headerName: "Type",
      cellRenderer: SubjectActivity,
    },
    { field: "academicHours", headerName: "Academic Hours" },
  ]
};

const Subjects = () => {
  const { subjects } = useSubjectsQuery();

  const { executeRequest: deleteSubjects } = useSubjectsExecute<GrouppedSubjectData[]>({ serviceFunction: "deleteSubjects" });

  const [selectedTerms, setSelectedTerms] = useState<GrouppedSubjectData[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<GrouppedSubjectData[]>([]);
  const [selectedSubjectActivities, setSelectedSubjectActivities] = useState<GrouppedSubjectData[]>([]);
  const [modalVisible, setModalVisible] = useState<'add' | 'edit' | undefined>();

  const selectedItems = useMemo(() => [
    ...selectedTerms,
    ...selectedSubjects,
    ...selectedSubjectActivities,
  ], [selectedTerms, selectedSubjects, selectedSubjectActivities]);

  const onDelete = () => {
    deleteSubjects(selectedItems);
  };

  const onEdit = () => {
    setModalVisible('edit');
  };

  const handleTermsSelected = (data: Array<Subject["term"]>) => {
    setSelectedTerms(data.map(item => ({
      data1: item,
    })));
  }

  const handleSubjectsSelected = (term: Subject["term"], data: Array<Subject["subject"]>) => {
    setSelectedSubjects(data.map(item => ({
      data1: term,
      data2: item,
    })));
  };

  const handleSubjectActivitiesSelected = (term: Subject["term"], specialty: Subject["subject"], data: Array<Subject["subjectActivity"]>) => {
    setSelectedSubjectActivities(data.map(item => ({
      data1: term,
      data2: specialty,
      data3: item,
    })));
  };

  return (
    <Root>
      <p>Subjects</p>
      <Toolbar
        selectedItems={selectedItems}
        buttonTexts={{
          addNewData1: "Add new term",
          addNewData2: "Add new subject",
          addNewData3: "Add new subject activity",
        }}
        onAdd={() => setModalVisible('add')}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Table
        data={[...subjects]}
        columns1={termsColDefs}
        columns2={subjectColDefs}
        columns3={subjectActivityColDefs}
        onTable1RowSelected={handleTermsSelected}
        onTable2RowSelected={handleSubjectsSelected}
        onTable3RowSelected={handleSubjectActivitiesSelected} />

      <SubjectModal
        open={!!modalVisible}
        subject={selectedItems.length ? { ...selectedItems[0] } : { data1: {} } as GrouppedSubjectData}
        mode={modalVisible}
        onClose={() => setModalVisible(undefined)} />
    </Root>
  );
};

export default Subjects;
