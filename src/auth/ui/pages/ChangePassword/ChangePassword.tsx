import {
  Content,
  Form,
  Root,
  Title,
  FormControl,
  Actions,
  Button,
  NeedHelp,
} from './styles';
import { InputLabel, OutlinedInput } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorModal, InfoModal } from '@/auth/ui/components';
import { requiredValidator } from '@/common/utils/validators';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type Inputs = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePassword = () => {
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [isPasswordChangeCompletedModalVisible, setIsPasswordChangeCompletedModalVisible] = useState(false);
  const [isFailedToChangePasswordModalVisible, setIsFailedToChangePasswordModalVisible] = useState(false);

  const { register, handleSubmit, formState } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const {newPassword, repeatNewPassword } = data;

    if (newPassword != repeatNewPassword) {
      setIsFailedToChangePasswordModalVisible(true);
      return;
    }

    // TODO: add actual implementation when the endpoint is rdy
    setIsPasswordChangeCompletedModalVisible(true);
  }

  const {isValid} = formState;

  return (
    <Root>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Password change</Title>
          <FormControl>
            <InputLabel shrink htmlFor="currentPassword">
              Current password
            </InputLabel>
            <OutlinedInput
              notched
              type="password"
              label="Current password"
              {...register('currentPassword', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="newPassword">
              New password
            </InputLabel>
            <OutlinedInput
              notched
              type="password"
              label="Current password"
              {...register('newPassword', { ...requiredValidator() })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="repeatNewPassword">
              Repeat new password
            </InputLabel>
            <OutlinedInput
              notched
              type="password"
              label="Repeat new password"
              {...register('repeatNewPassword', { ...requiredValidator() })}
            />
          </FormControl>
          <Actions>
            <NeedHelp onClick={() => setIsHelpModalVisible(true)} >
              Need help?
            </NeedHelp>
            <div>
              <Button  
                type="submit" 
                variant="contained" 
                color="primary"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button 
                disabled={!isValid} 
                type="submit" 
                variant="contained" 
                color="primary"
              >
                Send
              </Button>
            </div>
          </Actions>
        </Form>
      </Content>
      <InfoModal
        title='Password change'
        open={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
        onContinue={() => setIsHelpModalVisible(false)}
      >
        <p>The password must:</p>
        <p>1) be at least 8 characters long;</p>
        <p>2) consist of uppercase Latin letters A-Z;</p>
        <p>3) consist of lowercase Latin letters a-z;</p>
        <p>4) consist of numbers 0-9;</p>
        <p>5) consist of special characters ~!@#$%^&*()_-+={}[]|\\:;&lsquo;&ldquo;&lt;&gt;.?/</p>
      </InfoModal>
      <InfoModal
        title='Password change completed'
        open={isPasswordChangeCompletedModalVisible}
        onClose={() => navigate(-1)}
        onContinue={() => navigate(-1)}
      >
        <p>Your password has been successfully changed.</p>
        <p>Please use your new password for all future logins.</p>
        <p>If you encounter any issues, contact support.</p>
      </InfoModal>
      <ErrorModal
        open={isFailedToChangePasswordModalVisible}
        onClose={() => setIsFailedToChangePasswordModalVisible(false)}
        onContinue={() => setIsFailedToChangePasswordModalVisible(false)}
      >
        <p>Failed to change password. Please check that the old and the new password you entered are correct. The password must: </p>
        <p>1) be at least 8 characters long;</p>
        <p>2) consist of uppercase Latin letters A-Z;</p>
        <p>3) lowercase Latin letters a-z;</p>
        <p>4) consist of numbers 0-9;</p>
        <p>5) consist of special characters ~`!@#$%^&*()_-+={}[]|\:;&ldquo;&lsquo;&lt;&gt;.?/</p>
      </ErrorModal>
    </Root>
  );
};

export default ChangePassword;
