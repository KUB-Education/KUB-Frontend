import { styled } from '@mui/material';
import { ThreeTables } from '@/common/ui/components';
import { EducationalProgram } from '@/educational-programs/entities';

export const Table = styled(
  ThreeTables<
    EducationalProgram['studyField'],
    EducationalProgram['specialty'],
    EducationalProgram['educationalProgram']
  >,
)({});
