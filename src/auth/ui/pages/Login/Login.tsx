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
import { FormHelperText } from '@mui/material';
import { APP_ROUTES } from '@/common/routes.ts';
import { useLogin } from '@/auth/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FormTextField, ErrorModal, FieldLabel } from '@/common/ui/components';
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
            {emailError && <FormHelperText>{emailError}</FormHelperText>}
          </FormControl>
          <FormControl>
            <FieldLabel shrink htmlFor="password">
              Password
            </FieldLabel>
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
