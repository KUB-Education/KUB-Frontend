import { styled } from '@mui/material';
import EPToolbar from '@/educational-programs/ui/components/EPToolbar';
import EPTable from '@/educational-programs/ui/components/EPTable';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(EPToolbar)({
  marginBottom: '10px',
});

export const Table = styled(EPTable)({});
