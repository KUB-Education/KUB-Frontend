import { Button, Icon } from './styles';
import { ButtonProps } from '@mui/material';

export type ResendButtonProps = ButtonProps;

const ResendButton = ({
  children = 'Resend',
  ...otherProps
}: ResendButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<Icon width={18} height={18} />}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default ResendButton;
