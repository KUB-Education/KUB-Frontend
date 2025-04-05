import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const [breadcrumbKey, setBreadcrumbKey] = useState<string | null>(null);
  const pathToKeyMap: Record<string, string> = {
    '/home': 'Home',
    '/students': 'Students',
    '/student-groups': 'Student Groups',
    '/lecturers': 'Lecturers',
    '/subjects': 'Subjects',
    '/rooms': 'Rooms',
    '/educational-programs': 'Educational Programs',
    '/educational-programs/subjects': 'Educational Programs    >   Subjects',
    '/educational-program': 'Educational Programs    >   Subjects',
    '/departments': 'Departments',
    '/educational-courses': 'Educational Courses',
    '/timetables': 'Timetables',
    '/help': 'Help',
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      Admin
      <div
        style={{ fontSize: '16px', margin: '0 10px', verticalAlign: 'middle' }}
      >
        {' > '}
      </div>
      {breadcrumbKey}
    </div>
  );
};

export default Breadcrumb;
