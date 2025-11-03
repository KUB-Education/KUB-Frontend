import { Root, TableContainer } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table, TableTitle } from '@/common/ui/components';
import { StudyField } from '@/study-fields/entities';

export type StudyFieldsTableProps = {
  data: Array<StudyField>;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  onStudyFieldSelected: (data: Array<StudyField>) => void;
};

const StudyFieldsTable = ({
  data,
  isLoading,
  isError,
  className,
  onStudyFieldSelected,
}: StudyFieldsTableProps) => {
  const gridRef = useRef<AgGridReact<StudyField>>(null);

  const [colDefs] = useState<ColDef<StudyField>[]>([
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
    { field: 'code', headerName: 'Code' },
    { field: 'name', headerName: 'Name' },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onStudyFieldSelected(selected);
  }, [onStudyFieldSelected]);

  const getRowId = (row: GetRowIdParams<StudyField>) => {
    return String(row.data.id);
  };

  return (
    <Root className={className}>
      <TableTitle>Study Field</TableTitle>
      <TableContainer>
        <Table
          ref={gridRef}
          rowData={data}
          columnDefs={colDefs}
          onSelectionChanged={onSelectionChanged}
          getRowId={getRowId}
          loading={isLoading}
          error={isError}
          rowSelection="single"
          suppressRowClickSelection
        />
      </TableContainer>
    </Root>
  );
};

export default StudyFieldsTable;
