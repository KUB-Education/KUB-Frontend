import { styled } from '@mui/material';
import {
  EducationalProgramLoader,
  EducationalProgramToolbar,
} from '@/educational-programs/ui/components';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Loader = styled(EducationalProgramLoader)({
  margin: 'auto',
});

export const Toolbar = styled(EducationalProgramToolbar)({
  marginBottom: '10px',
});
