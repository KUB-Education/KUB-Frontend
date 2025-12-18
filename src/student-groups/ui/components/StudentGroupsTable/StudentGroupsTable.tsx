import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table } from '@/common/ui/components';
import { StudentGroup } from '@/student-groups/entities';

export type StudentGroupsTableProps = {
  data: Array<StudentGroup>;
  onStudentGroupsSelected: (data: Array<StudentGroup>) => void;
  isLoading?: boolean;
  isError?: boolean;
};

const StudentGroupsTable = ({
  data,
  isLoading,
  isError,
  onStudentGroupsSelected,
}: StudentGroupsTableProps) => {
  const gridRef = useRef<AgGridReact<StudentGroup>>(null);

  const [colDefs] = useState<ColDef<StudentGroup>[]>([
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
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onStudentGroupsSelected(selected);
  }, [onStudentGroupsSelected]);

  const getRowId = (row: GetRowIdParams<StudentGroup>) => {
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
        rowSelection="multiple"
        suppressRowClickSelection
      />
    </Root>
  );
};

export default StudentGroupsTable;
