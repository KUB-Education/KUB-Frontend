import { styled } from '@mui/material';
import {
  DepartmentsToolbar,
  DepartmentsTable,
} from '@/departments/ui/components';

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
