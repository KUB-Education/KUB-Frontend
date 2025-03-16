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
import { FormHelperText, InputLabel } from '@mui/material';
import { APP_ROUTES } from '@/common/routes.ts';
import { useLogin } from '@/auth/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorModal } from '@/auth/ui/components';
import { useState } from 'react';
import { FormTextField } from '@/common/ui/components';
import {
  emailValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onLoginFailed = () => {
    setIsErrorModalVisible(true);
  };
  const { login, isPending } = useLogin({ onError: onLoginFailed });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO maybe add trims
    login(data);
  };

  const { isValid, errors, touchedFields } = formState;

  const emailError =
    errors.email && touchedFields.email ? errors.email.message : '';

  return (
    <Root>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Login</Title>
          <FormControl error={!!emailError}>
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
            {emailError && <FormHelperText>{emailError}</FormHelperText>}
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <FormTextField
              id="password"
              label="Password"
              type="password"
              {...register('password', { ...requiredValidator() })}
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
