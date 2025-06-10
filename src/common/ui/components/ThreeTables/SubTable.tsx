import { Table } from './styles.tsx';
import { forwardRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { AgGridReactProps } from 'ag-grid-react';
import type { GetRowIdParams, RowClassParams,  } from 'ag-grid-community';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SubTableData = any;
export type SubTableSpecificProps = {
  activeRowId?: number;
  onTableRowSelected: (data: Array<SubTableData>) => void;
};
export type SubTableProps = SubTableSpecificProps & AgGridReactProps;

const SubTable = forwardRef<AgGridReact, SubTableProps>((props: SubTableProps, ref) => {
  const { rowData, columnDefs, activeRowId, onTableRowSelected, onRowClicked } = props;
  const gridRef = ref as React.MutableRefObject<AgGridReact | null>;

  const rowSelection = useMemo<{ mode: 'multiRow' }>(() => {
      return {
        mode: 'multiRow',
        enableClickSelection: true,
      };
    }, []);
  
  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) {
      return;
    }
    
    const selected = gridRef.current.api.getSelectedRows();

    onTableRowSelected(selected.map(s => rowData?.find(d => d.id === s.id)));
  }, [onTableRowSelected, rowData, gridRef]);

  const getRowId = useCallback((row: GetRowIdParams<SubTableData>) => {
    return String(row.data.id);
  }, []);

  const getRowStyle = useCallback((params: RowClassParams<SubTableData>) => {
    if (params.data?.id == activeRowId) {
      return { backgroundColor: '#5ac4f2' };
    }
    
    return undefined;
  }, [activeRowId]);

  return (
    <Table
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
        getRowId={getRowId}
        getRowStyle={getRowStyle}
        onRowClicked={onRowClicked}
      />
  );
});

SubTable.displayName = "SubTable";

export default SubTable;
