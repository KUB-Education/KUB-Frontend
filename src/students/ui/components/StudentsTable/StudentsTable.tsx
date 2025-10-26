import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table } from '@/common/ui/components';
import { UserStatus } from '@/users/ui/components';
import { Student } from '@/students/entities';

export type StudentsTableProps = {
  data: Array<Student>;
  onStudentsSelected: (data: Array<Student>) => void;
  isLoading?: boolean;
  isError?: boolean;
};

const StudentsTable = ({
  data,
  isLoading,
  isError,
  onStudentsSelected,
}: StudentsTableProps) => {
  const gridRef = useRef<AgGridReact<Student>>(null);

  const [colDefs] = useState<ColDef<Student>[]>([
    { field: 'id', headerName: 'ID', minWidth: 80 },
    { field: 'lastName', headerName: 'Last Name', minWidth: 125 },
    { field: 'firstName', headerName: 'First Name', minWidth: 125 },
    { field: 'middleName', headerName: 'Middle Name', minWidth: 125 },
    { field: 'email', headerName: 'Email', minWidth: 150 },
    {
      field: 'status',
      headerName: 'User Status',
      minWidth: 100,
      cellRenderer: UserStatus,
      resizable: false,
    },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onStudentsSelected(selected);
  }, [onStudentsSelected]);

  const getRowId = (row: GetRowIdParams<Student>) => {
    return String(row.data.id);
  };

  return (
    <Root>
      <Table
        ref={gridRef}
        rowData={data}
        columnDefs={colDefs}
        onSelectionChanged={onSelectionChanged}
        getRowId={getRowId}
        loading={isLoading}
        error={isError}
      />
    </Root>
  );
};

export default StudentsTable;
