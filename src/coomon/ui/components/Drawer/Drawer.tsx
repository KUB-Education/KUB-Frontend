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

export type MyDrawerProps = {
  open?: boolean;
};

const Drawer = ({ open }: MyDrawerProps) => {
  return (
    <Root variant="permanent" open={open}>
      <Content>
        <List>
          <ListItem>
            <NavLink to={APP_ROUTES.HOME}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon width={18} height={18} />
                </ListItemIcon>
                <ListItemText open={open}>Home</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <StudentIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Students</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <StudentGroupIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Student groups</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LecturesIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Lecturers</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SubjectsIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Subjects</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AudiencesIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Audiences</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <EducationalProgramsIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Educational programs</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <DepartmentsIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Departments</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <EducationalCoursesIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Educational courses</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <TimetablesIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Timetables</ListItemText>
            </ListItemButton>
          </ListItem>
          <HelpListItem>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon width={18} height={18} />
              </ListItemIcon>
              <ListItemText open={open}>Help</ListItemText>
            </ListItemButton>
          </HelpListItem>
        </List>
      </Content>
    </Root>
  );
};

export default Drawer;
