import { styled } from '@mui/material';

export const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Title = styled('h3')({});

export const IconWrapper = styled('div')({
  borderRadius: '100px',
  background: '#BA1A1A',
  width: '45px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#F1F1F5',
  marginBottom: '15px',
});
