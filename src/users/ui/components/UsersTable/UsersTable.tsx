import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table } from '@/common/ui/components';
import { User } from '@/users/entities';
import { UserStatus } from '@/users/ui/components';

export type UsersTableProps = {
  data: Array<User>;
  onUsersSelected: (data: Array<User>) => void;
  isLoading?: boolean;
  isError?: boolean;
};

const UsersTable = ({
  data,
  isLoading,
  isError,
  onUsersSelected,
}: UsersTableProps) => {
  const gridRef = useRef<AgGridReact<User>>(null);

  const [colDefs] = useState<ColDef<User>[]>([
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
    onUsersSelected(selected);
  }, [onUsersSelected]);

  const getRowId = (row: GetRowIdParams<User>) => {
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

export default UsersTable;
