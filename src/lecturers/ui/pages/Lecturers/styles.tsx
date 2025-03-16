import { styled } from '@mui/material';
import LecturersToolbar from '@/lecturers/ui/components/LecturesToolbar';
import LecturersTable from '@/lecturers/ui/components/LecturersTable';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(LecturersToolbar)({
  marginBottom: '10px',
});

export const Table = styled(LecturersTable)({});
