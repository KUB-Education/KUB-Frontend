import { styled } from '@mui/material';
import { ThreeTables, ThreeTablesToolbar } from '@/common/ui/components';
import { EducationalProgram } from '@/educational-programs/entities';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(ThreeTablesToolbar<EducationalProgram["studyField"], EducationalProgram["specialty"], EducationalProgram["educationalProgram"]>)({
  marginBottom: '10px',
});

export const Table = styled(ThreeTables<EducationalProgram["studyField"], EducationalProgram["specialty"], EducationalProgram["educationalProgram"]>)({});
