import { EducationalProgram } from '@/educational-programs/entities';
import { HierarchyData } from '@/common/entities';
import { Table } from './styles.tsx';
import AcademicDegree from '../AcademicDegree';
import StudyFormat from '../StudyFormat';

export type EducationalProgramsTableProps = {
  data: Array<
    HierarchyData<
      EducationalProgram['studyField'],
      EducationalProgram['specialty'],
      EducationalProgram['educationalProgram']
    >
  >;
  onStudyFieldsSelected: (
    fields: Array<EducationalProgram['studyField']>,
  ) => void;
  onSpecialtiesSelected: (
    studyField: EducationalProgram['studyField'],
    specialities: Array<EducationalProgram['specialty']>,
  ) => void;
  onEducationalProgramsSelected: (
    studyField: EducationalProgram['studyField'],
    specialty: EducationalProgram['specialty'],
    educationPrograms: Array<EducationalProgram['educationalProgram']>,
  ) => void;
};

const EducationalProgramsTable = ({
  data,
  onStudyFieldsSelected,
  onSpecialtiesSelected,
  onEducationalProgramsSelected,
}: EducationalProgramsTableProps) => {
  const studyFieldColDefs = {
    headerName: 'Study Field',
    children: [
      { field: 'id', headerName: 'ID' },
      { field: 'code', headerName: 'Code' },
      { field: 'name', headerName: 'Name' },
    ],
  };

  const specialtyColDefs = {
    headerName: 'Specialty',
    children: [
      { field: 'id', headerName: 'ID' },
      { field: 'code', headerName: 'Code' },
      { field: 'name', headerName: 'Name' },
    ],
  };

  const educationalProgramColDefs = {
    headerName: 'Educational Program',
    children: [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name' },
      {
        field: 'degreeType',
        headerName: 'Degree Type',
        cellRenderer: AcademicDegree,
      },
      {
        field: 'studyFormat',
        headerName: 'Study Format',
        cellRenderer: StudyFormat,
      },
    ],
  };

  return (
    <Table
      data={data}
      columns1={studyFieldColDefs}
      columns2={specialtyColDefs}
      columns3={educationalProgramColDefs}
      onTable1RowSelected={onStudyFieldsSelected}
      onTable2RowSelected={onSpecialtiesSelected}
      onTable3RowSelected={onEducationalProgramsSelected}
    />
  );
};

export default EducationalProgramsTable;
