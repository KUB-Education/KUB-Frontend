import SaveIcon from '@/common/assets/icons/save.svg?react';
import { Button } from './styles';
import { ButtonProps } from '@mui/material';

export type SaveButtonProps = ButtonProps;

const SaveButton = ({ children = 'Save', ...otherProps }: SaveButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<SaveIcon width={18} height={18} />}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default SaveButton;
