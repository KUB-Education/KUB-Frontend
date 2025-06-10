import { Data, GrouppedData } from '@/common/entities';
import {
  Root,
  AddButton,
  DeleteButton,
  EditButton,
  ActionsListItem,
  ActionsList,
} from './styles.tsx';


export type ThreeTablesToolbarProps<TData1 extends Data, TData2 extends Data, TData3 extends Data> = {
  selectedItems: GrouppedData<TData1, TData2, TData3>[];
  className?: string;
  buttonTexts: {
    addNewData1: string,
    addNewData2: string,
    addNewData3: string,
  };
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const ThreeTablesToolbar = <TData1 extends Data, TData2 extends Data, TData3 extends Data>({
  selectedItems,
  className,
  buttonTexts,
  onAdd,
  onDelete,
  onEdit,
}: ThreeTablesToolbarProps<TData1, TData2, TData3>) => {
  return (
    <Root className={className}>
      <ActionsList>
        {selectedItems.length === 1 && (
          <ActionsListItem>
            <EditButton onClick={onEdit} />
          </ActionsListItem>
        )}

        {selectedItems.length > 0 && (
          <ActionsListItem>
            <DeleteButton onClick={onDelete} />
          </ActionsListItem>
        )}

        {selectedItems.length === 0 && (
          <ActionsListItem>
            <AddButton onClick={onAdd}>{buttonTexts.addNewData1}</AddButton>
          </ActionsListItem>
        )}

        {selectedItems.length === 1 && !selectedItems[0].data2 && (
          <ActionsListItem>
            <AddButton onClick={onAdd}>{buttonTexts.addNewData2}</AddButton>
          </ActionsListItem>
        )}

        {selectedItems.length === 1 && selectedItems[0].data2 && !selectedItems[0].data3 && (
          <ActionsListItem>
            <AddButton onClick={onAdd}>{buttonTexts.addNewData3}</AddButton>
          </ActionsListItem>
        )}
      </ActionsList>
    </Root>
  );
};

export default ThreeTablesToolbar;
