import {
  FormControl as MuiFormControl,
  Button as MuiButton,
  styled,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Content = styled('div')({
  width: '100%',
  maxWidth: '460px',
  borderRadius: '28px',
  background: '#D1E8FF',
});

export const Form = styled('form')({
  padding: '22px 20px',
});

export const Title = styled('h1')({
  color: '#001D36',
  fontWeight: 400,
  lineHeight: '32px',
  marginBottom: '18px',
});

export const FormControl = styled(MuiFormControl)({
  width: '100%',
  marginBottom: '18px',
});

export const Actions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Button = styled(MuiButton)({
  textTransform: 'none',
  borderRadius: '100px',
  background: '#3BB3FF',
  boxShadow: 'none',
  paddingTop: 10,
  paddingBottom: 10,
});

export const Link = styled(RouterLink)({
  color: '#3BB3FF',
  lineHeight: '20px',
  fontSize: '14px',
});
