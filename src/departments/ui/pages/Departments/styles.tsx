import { styled } from '@mui/material';
import DepartmentsToolbar from '@/departments/ui/components/DepartmentsToolbar';
import DepartmentsTable from '@/departments/ui/components/DepartmentsTable';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(DepartmentsToolbar)({
  marginBottom: '10px',
});

export const Table = styled(DepartmentsTable)({});
