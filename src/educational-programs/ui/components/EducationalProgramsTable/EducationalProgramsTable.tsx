import { Root } from './styles';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table } from '@/common/ui/components';
import { EducationalProgram } from '@/educational-programs/entities';
import { DegreeType, StudyForm } from '@/educational-programs/ui/components';

export type EducationalProgramsTableProps = {
  data: Array<EducationalProgram>;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  onEducationalProgramSelected: (data: Array<EducationalProgram>) => void;
};

const EducationalProgramsTable = ({
  data,
  isLoading,
  isError,
  className,
  onEducationalProgramSelected,
}: EducationalProgramsTableProps) => {
  const gridRef = useRef<AgGridReact<EducationalProgram>>(null);

  const [colDefs] = useState<ColDef<EducationalProgram>[]>([
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 40,
      suppressSizeToFit: true,
      resizable: false,
      suppressMovable: true,
      lockPosition: true,
    },
    { field: 'id', headerName: 'ID', suppressSizeToFit: true, width: 100 },
    { field: 'name', headerName: 'Name' },
    {
      field: 'degreeType',
      headerName: 'Degree Type',
      cellRenderer: DegreeType,
    },
    {
      field: 'studyForm',
      headerName: 'Study Format',
      cellRenderer: StudyForm,
    },
    { field: 'duration', headerName: 'Duration' },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onEducationalProgramSelected(selected);
  }, [onEducationalProgramSelected]);

  const getRowId = (row: GetRowIdParams<EducationalProgram>) => {
    return String(row.data.id);
  };

  return (
    <Root className={className}>
      <Table
        ref={gridRef}
        rowData={data}
        columnDefs={colDefs}
        onSelectionChanged={onSelectionChanged}
        getRowId={getRowId}
        loading={isLoading}
        error={isError}
        rowSelection="multiple"
        suppressRowClickSelection
      />
    </Root>
  );
};

export default EducationalProgramsTable;
