import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const studentGroupsQueryKey = 'studentGroupsQuery';

export function useGetStudentGroups() {
  const { studentGroupsService } = useAppServices();

  const { data: studentGroups, ...otherData } = useQuery({
    queryKey: [studentGroupsQueryKey],
    queryFn: () => {
      return studentGroupsService.getGroups();
    },
    initialData: [],
  });

  return { studentGroups, ...otherData };
}
