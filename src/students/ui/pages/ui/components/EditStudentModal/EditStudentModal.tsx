import { useMemo } from 'react';
import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
} from '@/common/ui/components';
import {
  Content,
  Title,
  Actions,
  Form,
  FormControl,
  Row,
  Col,
} from './styles.tsx';
import { useForm } from 'react-hook-form';
import { EditStudentParams, Student } from '@/students/ui/pages/entities';
import { InputLabel } from '@mui/material';
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useEditLecturer } from '@/lecturers/hooks';
// import {
//   StudentStatus,
// } from '@/students/ui/pages/ui/components';
// import { Department } from '@/departments/entities';
import { getUserStatusLabel } from '@/users/entities';

export type EditStudentModalProps = {
  open: boolean;
  student: Student;
  // TODO wait departments loading
  //   departments: Department[];
  onClose: () => void;
};

type Inputs = Omit<EditStudentParams, 'id'>;

const EditStudentModal = ({
  open,
  onClose,
  student,
}: EditStudentModalProps) => {
  const values: Inputs = {
    ...student,
  };

  const { editLecturer, isPending } = useEditLecturer({ onSuccess: onClose });
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
    values,
  });

  const onSubmit = async (values: Inputs) => {
    return editLecturer({ ...values, id: student.id });
  };

  const userStatusValue = useMemo(() => {
    return student && getUserStatusLabel(student.userStatus);
  }, [student]);

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Student information</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <FormControl>
                <InputLabel shrink htmlFor="userStatus">
                  User Status
                </InputLabel>
                <FormTextField
                  label="userStatus"
                  readOnly
                  value={userStatusValue}
                />
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl>
                <InputLabel shrink htmlFor="lastName">
                  Last Name
                </InputLabel>
                <FormTextField
                  label="lastName"
                  {...register('lastName', { ...requiredValidator() })}
                />
              </FormControl>
            </Col>
            {/* <Col>
              <FormControl>
                <InputLabel shrink htmlFor="departmentId">
                  Department
                </InputLabel>
                <Controller
                  name="departmentId"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select notched label="departmentId" {...field}>
                      {departments.map((department) => (
                        <MenuItem key={department.id} value={department.id}>
                          {department.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Col> */}
          </Row>
          <Row>
            <Col>
              <FormControl>
                <InputLabel shrink htmlFor="firstName">
                  First Name
                </InputLabel>
                <FormTextField
                  label="firstName"
                  {...register('firstName', { ...requiredValidator() })}
                />
              </FormControl>
            </Col>
            {/* <Col>
              <FormControl>
                <InputLabel shrink htmlFor="academicTitle">
                  Academic title
                </InputLabel>
                <Controller
                  name="academicTitle"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select notched label="academicTitle" {...field}>
                      {academicTitles.map((title) => (
                        <MenuItem key={title} value={title}>
                          <AcademicTitle value={title} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Col> */}
          </Row>
          <Row>
            <Col>
              <FormControl>
                <InputLabel shrink htmlFor="middleName">
                  Middle Name
                </InputLabel>
                <FormTextField
                  label="middleName"
                  {...register('middleName', { ...requiredValidator() })}
                />
              </FormControl>
            </Col>
            {/* <Col>
              <FormControl>
                <InputLabel shrink htmlFor="position">
                  Position
                </InputLabel>
                <Controller
                  name="position"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select notched label="position" {...field}>
                      {lecturerPositions.map((title) => (
                        <MenuItem key={title} value={title}>
                          <LecturerPosition value={title} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Col> */}
          </Row>
          <Row>
            <Col>
              <FormControl>
                <InputLabel shrink htmlFor="email">
                  Email
                </InputLabel>
                <FormTextField
                  label="Email"
                  type="email"
                  {...register('email', {
                    ...requiredValidator(),
                    ...emailValidator(),
                  })}
                />
              </FormControl>
            </Col>
            {/* <Col>
              <FormControl>
                <InputLabel shrink htmlFor="status">
                  Status
                </InputLabel>
                <Controller
                  name="status"
                  control={control}
                  rules={{ ...requiredValidator() }}
                  render={({ field }) => (
                    <Select notched label="status" {...field}>
                      {lecturerStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          <LecturerStatus value={status} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Col> */}
          </Row>
          <Actions>
            <BackButton onClick={onClose} />
            <SaveButton loading={isPending} disabled={!isValid} type="submit" />
          </Actions>
        </Form>
      </Content>
    </Modal>
  );
};

export default EditStudentModal;
