import { styled } from '@mui/material';
import { EducationalProgramToolbar } from '@/educational-programs/ui/components';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(EducationalProgramToolbar)({
  marginBottom: '10px',
});
