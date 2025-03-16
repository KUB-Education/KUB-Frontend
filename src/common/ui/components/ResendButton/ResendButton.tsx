import ResendIcon from '@/common/assets/icons/refresh.svg?react';
import { Button } from './styles';
import { ButtonProps } from '@mui/material';

export type ResendButtonProps = ButtonProps;

const ResendButton = ({
  children = 'Resend',
  ...otherProps
}: ResendButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<ResendIcon width={18} height={18} />}
      color="primary"
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default ResendButton;
