import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table } from '@/common/ui/components';
import { Speciality } from '@/specialities/entities';

export type SpecialitiesTableProps = {
  data: Array<Speciality>;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  onSpecialitySelected: (data: Array<Speciality>) => void;
};

const SpecialitiesTable = ({
  data,
  isLoading,
  isError,
  className,
  onSpecialitySelected,
}: SpecialitiesTableProps) => {
  const gridRef = useRef<AgGridReact<Speciality>>(null);

  const [colDefs] = useState<ColDef<Speciality>[]>([
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
    onSpecialitySelected(selected);
  }, [onSpecialitySelected]);

  const getRowId = (row: GetRowIdParams<Speciality>) => {
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
        rowSelection="single"
        suppressRowClickSelection
      />
    </Root>
  );
};

export default SpecialitiesTable;
