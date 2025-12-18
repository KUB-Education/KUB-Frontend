import { Root, TableContainer } from './styles.tsx';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table, TableTitle } from '@/common/ui/components';
import { Term } from '@/terms/entities';

export type TermsTableProps = {
  data: Array<Term>;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  onTermsSelected: (data: Array<Term>) => void;
};

const TermsTable = ({
  data,
  isLoading,
  isError,
  className,
  onTermsSelected,
}: TermsTableProps) => {
  const gridRef = useRef<AgGridReact<Term>>(null);

  const [colDefs] = useState<ColDef<Term>[]>([
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
    { field: 'number', headerName: 'Number' },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onTermsSelected(selected);
  }, [onTermsSelected]);

  const getRowId = (row: GetRowIdParams<Term>) => {
    return String(row.data.id);
  };

  return (
    <Root className={className}>
      <TableTitle>Term</TableTitle>
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

export default TermsTable;
