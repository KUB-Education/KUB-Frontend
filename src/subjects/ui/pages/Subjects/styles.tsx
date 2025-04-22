import { styled } from '@mui/material';
import { ThreeTables, ThreeTablesToolbar } from '@/common/ui/components';
import { Subject } from '@/educational-programs/entities';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(ThreeTablesToolbar<Subject["term"], Subject["subject"], Subject["subjectActivity"]>)({
  marginBottom: '10px',
});

export const Table = styled(ThreeTables<Subject["term"], Subject["subject"], Subject["subjectActivity"]>)({});
