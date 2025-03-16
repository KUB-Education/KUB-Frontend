import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Lecturer } from '@/lecturers/entities';
import { Table } from '@/common/ui/components';

export type LecturersTableProps = {
  data: Array<Lecturer>;
  onLecturersSelected: (data: Array<Lecturer>) => void;
};

const LecturersTable = ({ data, onLecturersSelected }: LecturersTableProps) => {
  const gridRef = useRef<AgGridReact<Lecturer>>(null);

  const [colDefs] = useState<ColDef<Lecturer>[]>([
    { field: 'id', headerName: 'ID', minWidth: 80 },
    { field: 'lastName', headerName: 'Last Name', minWidth: 125 },
    { field: 'firstName', headerName: 'First Name', minWidth: 125 },
    { field: 'middleName', headerName: 'Middle Name', minWidth: 125 },
    { field: 'email', headerName: 'Email', minWidth: 150 },
    { field: 'userStatus', headerName: 'User Status', minWidth: 100 },
    { field: 'department', headerName: 'Department', minWidth: 120 },
    { field: 'academicTitle', headerName: 'Academic Title', minWidth: 120 },
    { field: 'position', headerName: 'Position', minWidth: 120 },
    { field: 'status', headerName: 'Status', resizable: false, minWidth: 100 },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onLecturersSelected(selected);
  }, [onLecturersSelected]);

  const getRowId = (row: GetRowIdParams<Lecturer>) => {
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
      />
    </Root>
  );
};

export default LecturersTable;
