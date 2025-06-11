import { styled } from '@mui/material';
import { ThreeTables } from '@/common/ui/components';
import {
  EducationalProgram,
  Specialty,
  StudyField,
} from '@/educational-programs/entities';

export const Table = styled(
  ThreeTables<StudyField, Specialty, EducationalProgram>,
)({});
