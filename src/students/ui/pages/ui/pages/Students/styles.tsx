import { styled } from '@mui/material';
import StudentsToolbar from '@/students/ui/pages/ui/components/StudentsToolbar';
import StudentsTable from '@/students/ui/pages/ui/components/StudentsTable';

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
