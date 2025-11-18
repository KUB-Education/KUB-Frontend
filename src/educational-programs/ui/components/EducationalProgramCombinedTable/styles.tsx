import { styled } from '@mui/material';
import { TermsTable as TermsTableRaw } from '@/terms/ui/components';
import { SubjectsTable as SubjectsTableRaw } from '@/subjects/ui/components';
import { SubjectActivitiesTable as SubjectActivitiesTableRaw } from '@/subject-activities/ui/components';

export const CombinedTable = styled('div')({
  display: 'flex',
  flexGrow: 1,
});

export const TermsTable = styled(TermsTableRaw)({
  maxWidth: '100%',
  flex: '0 0 auto',
  width: '18%',
});

export const SubjectsTable = styled(SubjectsTableRaw)({
  maxWidth: '100%',
  flex: '0 0 auto',
  width: '42%',
});

export const SubjectActivitiesTable = styled(SubjectActivitiesTableRaw)({
  maxWidth: '100%',
  width: '100%',
  flex: '1 0 0',
});
