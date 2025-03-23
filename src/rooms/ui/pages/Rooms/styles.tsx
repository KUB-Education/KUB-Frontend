import { styled } from '@mui/material';
import RoomsToolbar from '@/rooms/ui/components/RoomsToolbar';
import RoomsTable from '@/rooms/ui/components/RoomsTable';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(RoomsToolbar)({
  marginBottom: '10px',
});

export const Table = styled(RoomsTable)({});
