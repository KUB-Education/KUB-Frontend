import { Button as MuiButton, styled } from '@mui/material';
import ResendIcon from '@/common/assets/icons/refresh.svg?react';

export const Button = styled(MuiButton)({
  textTransform: 'none',
  borderRadius: '100px',
  background: '#D1E8FF',
  fontWeight: 500,
  height: '40px',
  color: '#4A4459',
  paddingLeft: '24px',
  paddingRight: '24px',
});

export const Icon = styled(ResendIcon)({
  fill: '#3BB3FF',
});
