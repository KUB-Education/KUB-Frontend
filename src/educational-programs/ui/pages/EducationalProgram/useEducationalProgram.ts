import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useEducationalProgram as useProgram } from '@/educational-programs/hooks';

export function useEducationalProgram() {
  const params = useParams<{ educationalProgramId: string }>();

  const educationalProgramId = useMemo(() => {
    return Number(params.educationalProgramId);
  }, [params.educationalProgramId]);

  const { educationalProgram } = useProgram({
    educationalProgramId,
    enabled: !!educationalProgramId,
  });

  return {
    educationalProgramId,
    educationalProgram,
  };
}
