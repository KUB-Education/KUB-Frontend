import { styled } from '@mui/material';
import { Table as TableBase } from '@/common/ui/components';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
});

export const Table = styled(TableBase)({
  width: '33.33%',
});
