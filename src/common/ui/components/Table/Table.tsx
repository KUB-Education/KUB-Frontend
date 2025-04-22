/* eslint-disable react/display-name */
import { forwardRef, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { AgGridReactProps } from 'ag-grid-react';
import { themeQuartz, iconSetMaterial } from 'ag-grid-community';
import type {
  ColDef,
  GridApi,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from 'ag-grid-community';
import { useDebouncedCallback } from 'use-debounce';

export const tableTheme = themeQuartz.withPart(iconSetMaterial).withParams({
  accentColor: '#008CFF',
  backgroundColor: '#F1F1F5',
  borderColor: '#8C8C96',
  borderRadius: 6,
  browserColorScheme: 'light',
  fontSize: '0.85rem',
  footerRowBorder: false,
  foregroundColor: '#050315',
  headerBackgroundColor: '#E9E9ED',
  headerFontSize: '0.9rem',
  headerRowBorder: true,
  oddRowBackgroundColor: '#D1E8FF',
  rowBorder: true,
  spacing: 5,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
  fontFamily: ['E-Ukraine', 'sans-serif'],
});

function resizeColumns(api: GridApi | undefined) {
  api?.sizeColumnsToFit();
}

export type TableProps = AgGridReactProps;
// TODO add generic for proper types
const Table = forwardRef<AgGridReact, TableProps>((props: TableProps, ref) => {
  const rowSelection = useMemo<{ mode: 'multiRow' }>(() => {
    return {
      mode: 'multiRow',
    };
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      wrapHeaderText: true,
      autoHeaderHeight: true,
      sortable: false,
    };
  }, []);

  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: 'fitGridWidth',
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedHandleResize = useDebouncedCallback(() => resizeColumns((ref as any)?.current?.api), 100);

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [debouncedHandleResize]);

  return (
    <AgGridReact
      ref={ref}
      theme={tableTheme}
      rowSelection={rowSelection}
      pagination={true}
      defaultColDef={defaultColDef}
      autoSizeStrategy={autoSizeStrategy}
      paginationPageSize={50}
      paginationPageSizeSelector={[50, 100, 200]}
      {...props}
    />
  );
});

export default Table;
