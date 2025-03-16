import { Button } from './styles';
import { ButtonProps } from '@mui/material';

export type BackButtonProps = ButtonProps;

const BackButton = ({ children = 'Back', ...otherProps }: BackButtonProps) => {
  return (
    <Button variant="outlined" {...otherProps}>
      {children}
    </Button>
  );
};

export default BackButton;
