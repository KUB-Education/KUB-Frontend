import { Root, TableContainer } from './styles';
import { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetRowIdParams } from 'ag-grid-community';
import { Table, TableTitle } from '@/common/ui/components';
import { SubjectActivity } from '@/subject-activities/entities';

export type SubjectActivitiesTableProps = {
  data: Array<SubjectActivity>;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  onSubjectActivitiesSelected: (data: Array<SubjectActivity>) => void;
};

const SubjectActivitiesTable = ({
  data,
  isLoading,
  isError,
  className,
  onSubjectActivitiesSelected,
}: SubjectActivitiesTableProps) => {
  const gridRef = useRef<AgGridReact<SubjectActivity>>(null);

  const [colDefs] = useState<ColDef<SubjectActivity>[]>([
    { field: 'type', headerName: 'Type' },
    {
      field: 'academicHours',
      headerName: 'Academic Hours',
      maxWidth: 140,
      minWidth: 100,
    },
  ]);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selected = gridRef.current.api.getSelectedRows();
    onSubjectActivitiesSelected(selected);
  }, [onSubjectActivitiesSelected]);

  const getRowId = (row: GetRowIdParams<SubjectActivity>) => {
    return String(row.data.id);
  };

  return (
    <Root className={className}>
      <TableTitle>Subject Activity</TableTitle>
      <TableContainer>
        <Table
          ref={gridRef}
          rowData={data}
          columnDefs={colDefs}
          onSelectionChanged={onSelectionChanged}
          getRowId={getRowId}
          loading={isLoading}
          error={isError}
          pagination={false}
        />
      </TableContainer>
    </Root>
  );
};

export default SubjectActivitiesTable;
