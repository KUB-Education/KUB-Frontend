import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const studyFieldsQueryKey = 'studyFieldsQuery';

export function useStudyFields() {
  const { studyFieldsService } = useAppServices();

  const { data: studyFields, ...otherData } = useQuery({
    queryKey: [studyFieldsQueryKey],
    queryFn: () => {
      return studyFieldsService.getStudyFields();
    },
    initialData: [],
  });

  return { studyFields, ...otherData };
}
