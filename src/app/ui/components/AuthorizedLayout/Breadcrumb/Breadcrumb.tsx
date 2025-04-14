import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { BreadcrumbWrapper, Separator } from './styles';
import { APP_ROUTES } from '@/common/routes';

const Breadcrumb = () => {
  const location = useLocation();
  const [breadcrumbKey, setBreadcrumbKey] = useState<string | null>(null);
  const pathToKeyMap: Record<string, string> = {
    [APP_ROUTES.HOME]: 'Home',
    [APP_ROUTES.STUDENTS]: 'Students',
    [APP_ROUTES.STUDENT_GROUPS]: 'Student Groups',
    [APP_ROUTES.LECTURERS]: 'Lecturers',
    [APP_ROUTES.SUBJECTS]: 'Subjects',
    [APP_ROUTES.ROOMS]: 'Rooms',
    [APP_ROUTES.EDUCATIONAL_PROGRAMS]: 'Educational Programs',
    [`${APP_ROUTES.EDUCATIONAL_PROGRAMS}/subjects`]:
      'Educational Programs   >   Subjects',
    ['/educational-program']: 'Educational Programs   >   Subjects',
    [APP_ROUTES.DEPARTMENTS]: 'Departments',
    [APP_ROUTES.EDUCATIONAL_COURSES]: 'Educational Courses',
    [APP_ROUTES.TIMETABLES]: 'Timetables',
    [APP_ROUTES.HELP]: 'Help',
  };
  useEffect(() => {
    const currentPath = location.pathname.split('/').slice(0, 2).join('/');
    if (pathToKeyMap[currentPath]) {
      setBreadcrumbKey(pathToKeyMap[currentPath]);
    } else {
      setBreadcrumbKey(null);
    }
  }, [location.pathname, pathToKeyMap]);

  return (
    <BreadcrumbWrapper>
      Admin
      <Separator>{' > '}</Separator>
      {breadcrumbKey}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
