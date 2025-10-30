import { styled } from '@mui/material';
import { StudentsTable, StudentsToolbar } from '@/students/ui/components';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(StudentsToolbar)({
  marginBottom: '10px',
});

export const Table = styled(StudentsTable)({});
