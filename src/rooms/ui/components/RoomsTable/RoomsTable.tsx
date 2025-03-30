import { Root } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Room } from '@/rooms/entities';
import { Table } from '@/common/ui/components';

export type RoomsTableProps = {
  data: Array<Room>;
  onRoomsSelected: (data: Array<Room>) => void;
};

const RoomsTable = ({ data, onRoomsSelected }: RoomsTableProps) => {
  const gridRef = useRef<AgGridReact<Room>>(null);

  const [colDefs] = useState<ColDef<Room>[]>([
    { field: 'id', headerName: 'ID', minWidth: 80 },
    { field: 'location', headerName: 'Location', minWidth: 125 },
    { field: 'capacity', headerName: 'Capacity', minWidth: 125, resizable: false }
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onRoomsSelected(selected);
  }, [onRoomsSelected]);

  const getRowId = (row: GetRowIdParams<Room>) => {
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

export default RoomsTable;
