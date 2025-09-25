import { CurrentUser, getUserStatusLabel } from '@/users/entities';
import {
  Actions,
  ChangeButton,
  Col,
  Content,
  Field,
  FieldLabel,
  FieldList,
  FieldListItem,
  FieldText,
  Root,
  Row,
  Title,
  ChangeButtonIcon,
  Loader,
  UserStatusField,
} from './styles';
import { BackButton } from '@/common/ui/components';

export type UserProfileSettingsProps = {
  currentUser?: CurrentUser;
  isPending: boolean;
  onBack: () => void;
  onChangePassword: () => void;
};

const UserProfileSettings = ({
  currentUser,
  onBack,
  onChangePassword,
}: UserProfileSettingsProps) => {
  if (!currentUser)
    return (
      <Root>
        <Loader />
      </Root>
    );

  return (
    <Root>
      <Row>
        <Col>
          <Title>User information</Title>
          <Content>
            <FieldList>
              <FieldListItem>
                <UserStatusField>
                  <FieldLabel shrink>User Status</FieldLabel>
                  <FieldText
                    readOnly
                    label="User Status"
                    value={getUserStatusLabel(currentUser.userStatus)}
                  />
                </UserStatusField>
              </FieldListItem>
              <FieldListItem>
                <Field>
                  <FieldLabel shrink>Last Name</FieldLabel>
                  <FieldText
                    readOnly
                    label="Last Name"
                    value={currentUser.lastName}
                  />
                </Field>
              </FieldListItem>
              <FieldListItem>
                <Field>
                  <FieldLabel shrink>First Name</FieldLabel>
                  <FieldText
                    readOnly
                    label="First Name"
                    value={currentUser.firstName}
                  />
                </Field>
              </FieldListItem>
              <FieldListItem>
                <Field>
                  <FieldLabel shrink>Middle Name</FieldLabel>
                  <FieldText
                    readOnly
                    label="Middle Name"
                    value={currentUser.middleName}
                  />
                </Field>
              </FieldListItem>
              <FieldListItem>
                <Field>
                  <FieldLabel shrink>Email</FieldLabel>
                  <FieldText readOnly label="Email" value={currentUser.email} />
                </Field>
              </FieldListItem>
            </FieldList>
          </Content>
        </Col>
        <Col>
          <Title>User roles</Title>
          <Content>
            <FieldList>
              {currentUser.roles.map((role) => (
                <FieldListItem key={role.id}>
                  <Field>
                    <FieldLabel shrink>Role</FieldLabel>
                    <FieldText
                      label="Role"
                      readOnly
                      value={role.name.toUpperCase()}
                    />
                  </Field>
                </FieldListItem>
              ))}
            </FieldList>
          </Content>
        </Col>
      </Row>
      <Actions>
        <BackButton onClick={onBack} />
        <ChangeButton
          variant="contained"
          startIcon={<ChangeButtonIcon width={18} height={18} />}
          onClick={onChangePassword}
        >
          Change password
        </ChangeButton>
      </Actions>
    </Root>
  );
};

export default UserProfileSettings;
