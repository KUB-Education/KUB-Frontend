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
import { InfoModal } from '@/auth/ui/components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { APP_ROUTES } from '@/common/routes';
import { EMAIL_REGEX } from '@/common/utils/email';

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [isRecoveryCompletedModalVisible, setIsRecoveryCompletedModalVisible] = useState(false);
  
  const { register, handleSubmit, formState } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = () => {
    // TODO: add actual implementation when the endpoint is rdy
    setIsRecoveryCompletedModalVisible(true);
  }

  const {isValid} = formState;

  return (
    <Root>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Password recovery</Title>
          <FormControl>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <OutlinedInput
              notched
              label="Email"
              {...register('email', 
                { required: true,
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Please enter a valid email address"
                  },
                },
              )}
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
        title='Password recovery'
        open={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
        onContinue={() => setIsHelpModalVisible(false)}
      >
        To reset your password, enter the email address you wish to check. If an account is associated with the provided email, a temporary password will be sent.
      </InfoModal>
      <InfoModal
        title='Password recovery completed'
        open={isRecoveryCompletedModalVisible}
        onClose={() => navigate(APP_ROUTES.LOGIN)}
        onContinue={() => navigate(APP_ROUTES.LOGIN)}
      >
        If an account is associated with the provided email, a temporary password has been sent. Please check your inbox, including spam or junk folders.
      </InfoModal>
    </Root>
  );
};

export default ForgotPassword;
