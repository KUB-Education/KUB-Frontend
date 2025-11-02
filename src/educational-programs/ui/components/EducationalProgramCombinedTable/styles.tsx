import { styled } from '@mui/material';
import { StudyFieldsTable as RawStudyFieldsTable } from '@/study-fields/ui/components';
import { SpecialitiesTable as RawSpecialitiesTable } from '@/specialities/ui/components';
import { EducationalProgramTable as RawEducationalProgramTable } from '@/educational-programs/ui/components';

export const CombinedTable = styled('div')({
  display: 'flex',
  flexGrow: 1,
});

export const StudyFieldsTable = styled(RawStudyFieldsTable)({
  maxWidth: '100%',
  flex: '0 0 auto',
  width: '30%',
});

export const SpecialitiesTable = styled(RawSpecialitiesTable)({
  maxWidth: '100%',
  flex: '0 0 auto',
  width: '30%',
});

export const EducationalProgramTable = styled(RawEducationalProgramTable)({
  maxWidth: '100%',
  flex: '0 0 auto',
  width: '40%',
});
