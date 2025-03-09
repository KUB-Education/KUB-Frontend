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
import { FormEvent } from 'react';

const Login = () => {
  const { login } = useLogin();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({ email: 'asdasd', password: 'asdasd' });
  };

  return (
    <Root>
      <Content>
        <Form onSubmit={onSubmit}>
          <Title>Login</Title>
          <FormControl>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <OutlinedInput notched id="email" label="Emal" />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <OutlinedInput notched id="password" label="Password" />
          </FormControl>
          <Actions>
            <Link to={APP_ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
            <Button type="submit" variant="contained" color="primary">
              Log in
            </Button>
          </Actions>
        </Form>
      </Content>
    </Root>
  );
};

export default Login;
