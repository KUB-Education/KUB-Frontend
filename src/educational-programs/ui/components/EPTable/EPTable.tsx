import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ColGroupDef, GetRowIdParams } from 'ag-grid-community';
import { EducationalProgram } from '@/educational-programs/entities';
import { Table } from '@/common/ui/components';

type FlatEducationalProgram = {
  id: number;
  studyFieldId: number;
  studyFieldCode: string;
  studyFieldName: string;
  specialtyId: number;
  specialtyCode: string;
  specialtyName: string;
  educationalProgramId: number;
  educationalProgramName: string;
  degreeType: string;
  studyFormat: string;
}

export type EPTableProps = {
  data: Array<EducationalProgram>;
  onEPsSelected: (data: Array<EducationalProgram>) => void;
};



function groupEducationalPrograms(data: EducationalProgram[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const studyFieldMap = new Map<number, any>();

  for (const item of data) {
    const { studyField, specialty, educationalProgram } = item;

    if (!studyFieldMap.has(studyField.id)) {
      studyFieldMap.set(studyField.id, {
        studyField,
        specialties: [],
      });
    }

    const group = studyFieldMap.get(studyField.id)!;

    let specialtyGroup = group.specialties.find((s: EducationalProgram) => s.specialty.id === specialty.id);

    if (!specialtyGroup) {
      specialtyGroup = {
        specialty,
        programs: [],
      };
      group.specialties.push(specialtyGroup);
    }



    specialtyGroup.programs.push({ rowId: item.id, ...educationalProgram });
  }

  const result: FlatEducationalProgram[] = [];

  const seenStudyFieldIds = new Set<number>();
  const seenSpecialtyIds = new Set<number>();

  for (const sf of studyFieldMap.values()) {
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

const EPTable = ({ data, onEPsSelected }: EPTableProps) => {
  const gridRef = useRef<AgGridReact<FlatEducationalProgram>>(null);

  const flatData = groupEducationalPrograms(data);

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
        { field: "degreeType", headerName: "Degree Type" },
        { field: "studyFormat", headerName: "Study Format" }
      ]
    }]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onEPsSelected(selected.map(s => data.find(d => d.id === s.id) as EducationalProgram));
  }, [onEPsSelected, data]);

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

export default EPTable;
