import {
  Content,
  Form,
  Root,
  Title,
  FormControl,
  Actions,
  Button,
  Link,
} from './styles';
import { InputLabel, OutlinedInput } from '@mui/material';
import { APP_ROUTES } from '@/common/routes.ts';
import { useLogin } from '@/auth/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorModal from '@/auth/ui/components/ErrorModal';
import { useState } from 'react';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<Inputs>();

  const onLoginFailed = () => {
    setIsErrorModalVisible(true);
  };
  const { login, isPending } = useLogin({ onError: onLoginFailed });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO maybe add trims
    login(data);
  };

  const { isValid } = formState;

  return (
    <Root>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Login</Title>
          <FormControl>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <OutlinedInput
              notched
              label="Emal"
              {...register('email', { required: true })}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <OutlinedInput
              notched
              id="password"
              label="Password"
              {...register('password', { required: true })}
            />
          </FormControl>
          <Actions>
            <Link to={APP_ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
            <Button
              loading={isPending}
              disabled={!isValid}
              type="submit"
              variant="contained"
              color="primary"
            >
              Log in
            </Button>
          </Actions>
        </Form>
      </Content>
      <ErrorModal
        open={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        onContinue={() => setIsErrorModalVisible(false)}
      >
        The email or password you entered is incorrect or not in a valid format.
        Please check your input and try again.
      </ErrorModal>
    </Root>
  );
};

export default Login;
