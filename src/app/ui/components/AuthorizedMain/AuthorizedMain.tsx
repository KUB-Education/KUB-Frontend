import { Route, Routes, Navigate } from 'react-router';
import { Home } from '../../../../home/ui/pages';
import AuthorizedLayout from '../AuthorizedLayout';
import { APP_ROUTES } from '../../../../coomon/routes.ts';
import { Students } from '../../../../students/ui/pages';
import { StudentGroups } from '../../../../student-groups/ui/pages';
import { Lectures } from '../../../../lectures/ui/pages';
import { Subjects } from '../../../../subjects/ui/pages';
import { Rooms } from '../../../../rooms/ui/pages';
import { EducationalPrograms } from '../../../../educational-programs/ui/pages';
import { Departments } from '../../../../departments/ui/pages';
import { EducationalCourses } from '../../../../educational-courses/ui/pages';
import { Timetables } from '../../../../timetables/ui/pages';
import { Help } from '../../../../help/ui/pages';

const AuthorizedMain = () => {
  return (
    <Routes>
      <Route element={<AuthorizedLayout />}>
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        <Route path={APP_ROUTES.STUDENTS} element={<Students />} />
        <Route path={APP_ROUTES.STUDENT_GROUPS} element={<StudentGroups />} />
        <Route path={APP_ROUTES.LECTURES} element={<Lectures />} />
        <Route path={APP_ROUTES.SUBJECTS} element={<Subjects />} />
        <Route
          path={APP_ROUTES.EDUCATIONAL_PROGRAMS}
          element={<EducationalPrograms />}
        />
        <Route path={APP_ROUTES.DEPARTMENTS} element={<Departments />} />
        <Route
          path={APP_ROUTES.EDUCATIONAL_COURSES}
          element={<EducationalCourses />}
        />
        <Route path={APP_ROUTES.ROOMS} element={<Rooms />} />
        <Route path={APP_ROUTES.TIMETABLES} element={<Timetables />} />
        <Route path={APP_ROUTES.HELP} element={<Help />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
      </Route>
    </Routes>
  );
};

export default AuthorizedMain;
