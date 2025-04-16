import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Student } from '@/students/ui/pages/entities';
import { Table } from '@/common/ui/components';

import { UserStatus } from '@/users/ui/components';

export type StudentsTableProps = {
  data: Array<Student>;
  onStudentsSelected: (data: Array<Student>) => void;
};

const StudentsTable = ({ data, onStudentsSelected }: StudentsTableProps) => {
  const gridRef = useRef<AgGridReact<Student>>(null);

  const [colDefs] = useState<ColDef<Student>[]>([
    { field: 'id', headerName: 'ID', minWidth: 80 },
    { field: 'lastName', headerName: 'Last Name', minWidth: 125 },
    { field: 'firstName', headerName: 'First Name', minWidth: 125 },
    { field: 'middleName', headerName: 'Middle Name', minWidth: 125 },
    { field: 'email', headerName: 'Email', minWidth: 150 },
    {
      field: 'userStatus',
      headerName: 'User Status',
      minWidth: 100,
      cellRenderer: UserStatus,
    },
    // {
    //   field: 'department.name',
    //   headerName: 'Department',
    //   minWidth: 120,
    // },
    // {
    //   field: 'academicTitle',
    //   headerName: 'Academic Title',
    //   minWidth: 120,
    //   cellRenderer: AcademicTitle,
    // },
    // {
    //   field: 'position',
    //   headerName: 'Position',
    //   minWidth: 120,
    //   cellRenderer: LecturerPosition,
    // },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   resizable: false,
    //   minWidth: 100,
    //   cellRenderer: LecturerStatus,
    // },
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
      />
    </Root>
  );
};

export default StudentsTable;
