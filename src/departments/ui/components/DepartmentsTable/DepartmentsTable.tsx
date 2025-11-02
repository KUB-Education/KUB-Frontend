import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Department } from '@/departments/entities';
import { Table } from '@/common/ui/components';

export type DepartmentsTableProps = {
  data: Array<Department>;
  isLoading?: boolean;
  isError?: boolean;
  onDepartmentsSelected: (data: Array<Department>) => void;
};

const DepartmentsTable = ({
  data,
  isLoading,
  isError,
  onDepartmentsSelected,
}: DepartmentsTableProps) => {
  const gridRef = useRef<AgGridReact<Department>>(null);

  const [colDefs] = useState<ColDef<Department>[]>([
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
    { field: 'id', headerName: 'ID', suppressSizeToFit: true },
    { field: 'name', headerName: 'Name' },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onDepartmentsSelected(selected);
  }, [onDepartmentsSelected]);

  const getRowId = (row: GetRowIdParams<Department>) => {
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

export default DepartmentsTable;
