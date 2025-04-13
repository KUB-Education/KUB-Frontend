import { Root } from './styles.tsx';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ColGroupDef, GetRowIdParams } from 'ag-grid-community';
import { EducationalProgram } from '@/educational-programs/entities';
import { Table } from '@/common/ui/components';
import { AcademicDegree, StudyFormat } from '@/educational-programs/ui/components';

type GrouppedEducationalProgram = {
  studyField: EducationalProgram["studyField"];
  specialties: Array<{
    specialty: EducationalProgram["specialty"];
    programs: (EducationalProgram["educationalProgram"] & { rowId: number })[];
  }>;
};

type FlatEducationalProgram = {
  id: number;
  studyFieldId?: number;
  studyFieldCode?: string;
  studyFieldName?: string;
  specialtyId?: number;
  specialtyCode?: string;
  specialtyName?: string;
  educationalProgramId: number;
  educationalProgramName: string;
  degreeType: string;
  studyFormat: string;
}

export type EducationalProgramTableProps = {
  data: Array<EducationalProgram>;
  onEducationalProgramsSelected: (data: Array<EducationalProgram>) => void;
};

function groupEducationalPrograms(data: EducationalProgram[]) {
  const grouppedResult = new Map<number, GrouppedEducationalProgram>();

  for (const item of data) {
    const { studyField, specialty, educationalProgram } = item;

    if (!grouppedResult.has(studyField.id)) {
      grouppedResult.set(studyField.id, {
        studyField,
        specialties: [],
      });
    }

    const group = grouppedResult.get(studyField.id)!;

    let specialtyGroup = group.specialties.find(s => s.specialty.id === specialty.id);

    if (!specialtyGroup) {
      specialtyGroup = {
        specialty,
        programs: [],
      };
      group.specialties.push(specialtyGroup);
    }

    specialtyGroup.programs.push({ rowId: item.id, ...educationalProgram });
  }

  return grouppedResult;
}

function flatEducationalPrograms(grouppedData: Map<number, GrouppedEducationalProgram>) {
  const result: FlatEducationalProgram[] = [];

  const seenStudyFieldIds = new Set<number>();
  const seenSpecialtyIds = new Set<number>();

  for (const sf of grouppedData.values()) {
    for (const sp of sf.specialties) {
      for (const pr of sp.programs) {
        const isFirstStudyField = !seenStudyFieldIds.has(sf.studyField.id);
        const isFirstSpecialty = !seenSpecialtyIds.has(sp.specialty.id);

        result.push({
          id: pr.rowId,
          studyFieldId: isFirstStudyField ? sf.studyField.id : undefined,
          studyFieldCode: isFirstStudyField ? sf.studyField.code : undefined,
          studyFieldName: isFirstStudyField ? sf.studyField.name : undefined,

          specialtyId: isFirstSpecialty ? sp.specialty.id : undefined,
          specialtyCode: isFirstSpecialty ? sp.specialty.code : undefined,
          specialtyName: isFirstSpecialty ? sp.specialty.name : undefined,

          educationalProgramId: pr.id,
          educationalProgramName: pr.name,
          degreeType: pr.degreeType,
          studyFormat: pr.studyFormat,
        });

        if (isFirstStudyField) seenStudyFieldIds.add(sf.studyField.id);
        if (isFirstSpecialty) seenSpecialtyIds.add(sp.specialty.id);
      }
    }
  }

  return result;
}

const EducationalProgramTable = ({ data, onEducationalProgramsSelected }: EducationalProgramTableProps) => {
  const gridRef = useRef<AgGridReact<FlatEducationalProgram>>(null);

  const flatData = useMemo(() => {
    const grouppedData = groupEducationalPrograms(data);
    const flatData = flatEducationalPrograms(grouppedData);

    return flatData;
  }, [data]);

  const [colDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Study Field",
      children: [
        { field: "studyFieldId", headerName: "ID" },
        { field: "studyFieldCode", headerName: "Code" },
        { field: "studyFieldName", headerName: "Name" }
      ]
    },
    {
      headerName: "Specialty",
      children: [
        { field: "specialtyId", headerName: "ID" },
        { field: "specialtyCode", headerName: "Code" },
        { field: "specialtyName", headerName: "Name" }
      ]
    },
    {
      headerName: "Educational Program",
      children: [
        { field: "educationalProgramId", headerName: "ID" },
        { field: "educationalProgramName", headerName: "Name" },
        {
          field: "degreeType",
          headerName: "Degree Type",
          cellRenderer: AcademicDegree,
        },
        {
          field: "studyFormat",
          headerName: "Study Format",
          cellRenderer: StudyFormat,
        }
      ]
    }]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onEducationalProgramsSelected(selected.map(s => data.find(d => d.id === s.id) as EducationalProgram));
  }, [onEducationalProgramsSelected, data]);

  const getRowId = (row: GetRowIdParams<EducationalProgram>) => {
    return String(row.data.id);
  };

  return (
    <Root>
      <Table
        ref={gridRef}
        rowData={flatData}
        columnDefs={colDefs}
        onSelectionChanged={onSelectionChanged}
        getRowId={getRowId}
      />
    </Root>
  );
};

export default EducationalProgramTable;
