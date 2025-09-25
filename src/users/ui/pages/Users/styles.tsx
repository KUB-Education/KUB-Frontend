import { styled } from '@mui/material';
import { UsersToolbar, UsersTable } from '@/users/ui/components';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(UsersToolbar)({
  marginBottom: '10px',
});

export const Table = styled(UsersTable)({});
