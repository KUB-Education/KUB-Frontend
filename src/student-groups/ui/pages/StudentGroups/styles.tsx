import { styled } from '@mui/material';
import { StudentGroupsTable, StudentGroupsToolbar } from '@/student-groups/ui/components';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(StudentGroupsToolbar)({
  marginBottom: '10px',
});

export const Table = styled(StudentGroupsTable)({});
