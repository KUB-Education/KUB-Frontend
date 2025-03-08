import React from 'react';
/* eslint-disable import/no-unresolved */
import HomeIcon from '../../../assets/icons/home.svg?react';
import StudentIcon from '../../../assets/icons/student.svg?react';
import StudentGroupIcon from '../../../assets/icons/student_group.svg?react';
import LecturesIcon from '../../../assets/icons/lecturer.svg?react';
import SubjectsIcon from '../../../assets/icons/subject.svg?react';
import AudiencesIcon from '../../../assets/icons/audience.svg?react';
import EducationalProgramsIcon from '../../../assets/icons/educational_program.svg?react';
import DepartmentsIcon from '../../../assets/icons/department.svg?react';
import EducationalCoursesIcon from '../../../assets/icons/educational_course.svg?react';
import TimetablesIcon from '../../../assets/icons/timetable.svg?react';
import HelpIcon from '../../../assets/icons/help.svg?react';
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
import { APP_ROUTES } from '../../../routes.ts';

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
    to: APP_ROUTES.LECTURES,
    icon: LecturesIcon,
    text: 'Lectures',
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
