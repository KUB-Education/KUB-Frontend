import { Button, styled } from '@mui/material';

export const Content = styled('div')({
  maxWidth: '450px',
  width: '100%',
  borderRadius: '28px',
  background: '#FFDAD6',
  padding: '24px',
});

export const Title = styled('h3')({
  color: '#050315',
  fontSize: '1.5rem',
  fontWeight: 400,
  lineHeight: '32px',
  marginBottom: '16px',
});

export const Actions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '24px',
});

export const ContinueButton = styled(Button)({
  textTransform: 'none',
});

export const DescriptionWrapper = styled('div')({
  color: '#49454F',
  fontSize: '1rem',
  lineHeight: '20px',
});
