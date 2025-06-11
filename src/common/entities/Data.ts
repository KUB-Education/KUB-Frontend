export type Data =
  | {
      id: number;
    }
  | undefined;

export type HierarchyData<
  TData1 extends Data,
  TData2 extends Data,
  TData3 extends Data,
> = {
  data1Value: TData1;
  data2: Array<{
    data2Value: TData2;
    data3: TData3[];
  }>;
};

export type GrouppedData<
  TData1 extends Data,
  TData2 extends Data,
  TData3 extends Data,
> = Partial<{
  data1: TData1;
  data2?: TData2;
  data3?: TData3;
}>;
