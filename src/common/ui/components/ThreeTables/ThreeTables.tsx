import { Root } from './styles.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ColDef, ColGroupDef, GetRowIdParams, } from 'ag-grid-community';
import SubTable from './SubTable.tsx'
import { AgGridReact } from 'ag-grid-react';
import { Data, HierarchyData } from '@/common/entities';

export type ThreeTablesProps<TData1 extends Data, TData2 extends Data, TData3 extends Data> = {
  data: Array<HierarchyData<TData1, TData2, TData3>>;
  columns1: ColDef | ColGroupDef;
  columns2: ColDef | ColGroupDef;
  columns3: ColDef | ColGroupDef;
  onTable1RowSelected: (data: Array<TData1>) => void;
  onTable2RowSelected: (data1: TData1, data: Array<TData2>) => void;
  onTable3RowSelected: (data1: TData1, data2: TData2, data: Array<TData3>) => void;
};

const ThreeTables = <TData1 extends Data, TData2 extends Data, TData3 extends Data>(props: ThreeTablesProps<TData1, TData2, TData3>) => {
  const grid1Ref = useRef<AgGridReact<TData1>>(null);
  const grid2Ref = useRef<AgGridReact<TData2>>(null);
  const grid3Ref = useRef<AgGridReact<TData3>>(null);

  const [rowData1, setRowData1] = useState<TData1[]>([]);
  const [rowData2, setRowData2] = useState<TData2[]>([]);
  const [rowData3, setRowData3] = useState<TData3[]>([]);
  const [activeRow1, setActiveRow1] = useState<TData1 | undefined>();
  const [activeRow2, setActiveRow2] = useState<TData2 | undefined>();
  const [colDefs1] = useState<(ColDef | ColGroupDef)[]>([props.columns1]);
  const [colDefs2] = useState<(ColDef | ColGroupDef)[]>([props.columns2]);
  const [colDefs3] = useState<(ColDef | ColGroupDef)[]>([props.columns3]);

  useEffect(() => {
    const newRowData1 = props.data.length > 0 ? props.data.map(g => g.data1Value) : [];

    setRowData1(newRowData1);
    setRowData2([]);
    setRowData3([]);
  }, [props.data]);

  useEffect(() => {
    const newRows2 = props.data
      .find(d => d.data1Value?.id === activeRow1?.id)
      ?.data2.map(s => s.data2Value)
      ?? [];

    setRowData2(newRows2);
  }, [props.data, activeRow1]);

  useEffect(() => {
    const newRows3 = props.data
      .find(d => d.data1Value?.id === activeRow1?.id)
      ?.data2.find(s => s.data2Value?.id === activeRow2?.id)
      ?.data3 ?? [];

    setRowData3(newRows3);
  }, [props.data, activeRow2, activeRow1]);

  const onTable1RowSelected = useCallback((item: Array<TData1>) => {
    if (item.length > 0) {
      grid2Ref.current?.api.deselectAll();
      grid3Ref.current?.api.deselectAll();
    }

    props.onTable1RowSelected(item);
  }, [props.onTable1RowSelected]);

  const onTable2RowSelected = useCallback((item: Array<TData2>) => {
    if (item.length > 0) {
      grid1Ref.current?.api.deselectAll();
      grid3Ref.current?.api.deselectAll();
    }

    props.onTable2RowSelected(activeRow1!, item);
  }, [props.onTable2RowSelected, activeRow1]);

  const onTable3RowSelected = useCallback((item: Array<TData3>) => {
    if (item.length > 0) {
      grid1Ref.current?.api.deselectAll();
      grid2Ref.current?.api.deselectAll();
    }

    props.onTable3RowSelected(activeRow1!, activeRow2!, item);
  }, [props.onTable3RowSelected, activeRow1, activeRow2]);

  const onTable1RowClick = useCallback((item: TData1) => {
    setActiveRow1(item);
    setActiveRow2(undefined);
  }, []);

  const getRowId = (row: GetRowIdParams<Data>) => {
    return String(row.data?.id);
  };


  return (
    <Root>
      <SubTable
        ref={grid1Ref}
        rowData={[...rowData1]}
        columnDefs={colDefs1}
        activeRowId={activeRow1?.id}
        onTableRowSelected={onTable1RowSelected}
        onRowClicked={(e) => onTable1RowClick(e.data)}
        getRowId={getRowId}
      />
      <SubTable
        ref={grid2Ref}
        rowData={[...rowData2]}
        columnDefs={colDefs2}
        activeRowId={activeRow2?.id}
        onTableRowSelected={onTable2RowSelected}
        onRowClicked={(e) => setActiveRow2(e.data)}
        getRowId={getRowId}
      />
      <SubTable
        ref={grid3Ref}
        rowData={[...rowData3]}
        columnDefs={colDefs3}
        onTableRowSelected={onTable3RowSelected}
        getRowId={getRowId}
      />
    </Root>
  );
};

export default ThreeTables;
