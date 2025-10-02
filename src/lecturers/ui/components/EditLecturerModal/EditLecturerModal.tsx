import { useMemo } from 'react';
import {
  Modal,
  BackButton,
  FormTextField,
  SaveButton,
  FieldLabel,
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
import { Controller, useForm } from 'react-hook-form';
import {
  academicTitles,
  EditLecturerParams,
  Lecturer,
  lecturerPositions,
  lecturerStatuses,
} from '@/lecturers/entities';
import { MenuItem, Select } from '@mui/material';
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';
import { useEditLecturer } from '@/lecturers/hooks';
import {
  AcademicTitle,
  LecturerPosition,
  LecturerStatus,
} from '@/lecturers/ui/components';
import { Department } from '@/departments/entities';
import { getUserStatusLabel } from '@/users/entities';

export type EditLecturerModalProps = {
  open: boolean;
  lecturer: Lecturer;
  // TODO wait departments loading
  departments: Department[];
  onClose: () => void;
};

type Inputs = Omit<EditLecturerParams, 'id'>;

const EditLecturerModal = ({
  open,
  onClose,
  lecturer,
  departments,
}: EditLecturerModalProps) => {
  const values: Inputs = {
    ...lecturer,
    departmentId: lecturer && lecturer.department.id,
  };

  const { editLecturer, isPending } = useEditLecturer({ onSuccess: onClose });
  const { register, handleSubmit, formState, control } = useForm<Inputs>({
    mode: 'onChange',
    values,
  });

  const onSubmit = async (values: Inputs) => {
    return editLecturer({ ...values, id: lecturer.id });
  };

  const userStatusValue = useMemo(() => {
    return lecturer && getUserStatusLabel(lecturer.userStatus);
  }, [lecturer]);

  const { isValid } = formState;

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Lecturer information</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="userStatus">
                  User Status
                </FieldLabel>
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
                <FieldLabel shrink htmlFor="lastName">
                  Last Name
                </FieldLabel>
                <FormTextField
                  label="lastName"
                  {...register('lastName', { ...requiredValidator() })}
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="departmentId">
                  Department
                </FieldLabel>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="firstName">
                  First Name
                </FieldLabel>
                <FormTextField
                  label="firstName"
                  {...register('firstName', { ...requiredValidator() })}
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="academicTitle">
                  Academic title
                </FieldLabel>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="middleName">
                  Middle Name
                </FieldLabel>
                <FormTextField
                  label="middleName"
                  {...register('middleName', { ...requiredValidator() })}
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="position">
                  Position
                </FieldLabel>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="email">
                  Email
                </FieldLabel>
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
            <Col>
              <FormControl>
                <FieldLabel shrink htmlFor="status">
                  Status
                </FieldLabel>
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
            </Col>
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

export default EditLecturerModal;
