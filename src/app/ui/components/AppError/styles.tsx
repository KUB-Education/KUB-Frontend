import { styled } from '@mui/material';

export const Root = styled('div')({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Title = styled('h2')({});

export const IconWrapper = styled('div')({
  borderRadius: '100px',
  background: '#BA1A1A',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#F1F1F5',
  marginBottom: '15px',
});
