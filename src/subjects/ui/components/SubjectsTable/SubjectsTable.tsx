import { Root, TableContainer } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table, TableTitle } from '@/common/ui/components';
import { Subject } from '@/subjects/entities';

export type SubjectsTableProps = {
  data: Array<Subject>;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  onSubjectsSelected: (data: Array<Subject>) => void;
};

const SubjectsTable = ({
  data,
  isLoading,
  isError,
  className,
  onSubjectsSelected,
}: SubjectsTableProps) => {
  const gridRef = useRef<AgGridReact<Subject>>(null);

  const [colDefs] = useState<ColDef<Subject>[]>([
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
    { field: 'name', headerName: 'Name' },
    { field: 'type', headerName: 'Type', maxWidth: 135, minWidth: 100 },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onSubjectsSelected(selected);
  }, [onSubjectsSelected]);

  const getRowId = (row: GetRowIdParams<Subject>) => {
    return String(row.data.id);
  };

  return (
    <Root className={className}>
      <TableTitle>Subject</TableTitle>
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
          pagination={false}
        />
      </TableContainer>
    </Root>
  );
};

export default SubjectsTable;
