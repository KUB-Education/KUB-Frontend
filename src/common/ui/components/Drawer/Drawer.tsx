import React from 'react';
import HomeIcon from '@/common/assets/icons/home.svg?react';
import StudentIcon from '@/common/assets/icons/student.svg?react';
import StudentGroupIcon from '@/common/assets/icons/student_group.svg?react';
import LecturesIcon from '@/common/assets/icons/lecturer.svg?react';
import SubjectsIcon from '@/common/assets/icons/subject.svg?react';
import AudiencesIcon from '@/common/assets/icons/audience.svg?react';
import EducationalProgramsIcon from '@/common/assets/icons/educational_program.svg?react';
import DepartmentsIcon from '@/common/assets/icons/department.svg?react';
import EducationalCoursesIcon from '@/common/assets/icons/educational_course.svg?react';
import TimetablesIcon from '@/common/assets/icons/timetable.svg?react';
import HelpIcon from '@/common/assets/icons/help.svg?react';
import {
  Content,
  Root,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  HelpListItem,
} from './styles';
import { NavLink } from 'react-router';
import { APP_ROUTES } from '@/common/routes.ts';

const links = [
  {
    to: APP_ROUTES.HOME,
    icon: HomeIcon,
    text: 'Home',
  },
  {
    to: APP_ROUTES.STUDENTS,
    icon: StudentIcon,
    text: 'Students',
  },
  {
    to: APP_ROUTES.STUDENT_GROUPS,
    icon: StudentGroupIcon,
    text: 'Student Groups',
  },
  {
    to: APP_ROUTES.LECTURERS,
    icon: LecturesIcon,
    text: 'Lecturers',
  },
  {
    to: APP_ROUTES.SUBJECTS,
    icon: SubjectsIcon,
    text: 'Subjects',
  },
  {
    to: APP_ROUTES.ROOMS,
    icon: AudiencesIcon,
    text: 'Rooms',
  },
  {
    to: APP_ROUTES.EDUCATIONAL_PROGRAMS,
    icon: EducationalProgramsIcon,
    text: 'Educational Programs',
  },
  {
    to: APP_ROUTES.DEPARTMENTS,
    icon: DepartmentsIcon,
    text: 'Departments',
  },
  {
    to: APP_ROUTES.EDUCATIONAL_COURSES,
    icon: EducationalCoursesIcon,
    text: 'Educational Courses',
  },
  {
    to: APP_ROUTES.TIMETABLES,
    icon: TimetablesIcon,
    text: 'Timetables',
  },
  {
    to: APP_ROUTES.HELP,
    icon: HelpIcon,
    text: 'Help',
  },
];

export type MyDrawerProps = {
  open?: boolean;
};

const Drawer = ({ open }: MyDrawerProps) => {
  return (
    <Root variant="permanent" open={open}>
      <Content>
        <List>
          {links.map(({ to, text, icon: Icon }) => (
            <React.Fragment key={to}>
              {to !== APP_ROUTES.HELP ? (
                <ListItem>
                  <NavLink to={to}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon width={18} height={18} />
                      </ListItemIcon>
                      <ListItemText open={open}>{text}</ListItemText>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ) : (
                <HelpListItem>
                  <NavLink to={to}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon width={18} height={18} />
                      </ListItemIcon>
                      <ListItemText open={open}>{text}</ListItemText>
                    </ListItemButton>
                  </NavLink>
                </HelpListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Content>
    </Root>
  );
};

export default Drawer;
