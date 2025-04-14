import { styled } from '@mui/material';
import EducationalProgramToolbar from '@/educational-programs/ui/components/EducationalProgramToolbar';
import EducationalProgramTable from '@/educational-programs/ui/components/EducationalProgramTable';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(EducationalProgramToolbar)({
  marginBottom: '10px',
});

export const Table = styled(EducationalProgramTable)({});
