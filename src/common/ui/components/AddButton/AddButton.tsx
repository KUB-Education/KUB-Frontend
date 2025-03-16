import AddIcon from '@/common/assets/icons/add.svg?react';
import { Button } from './styles';
import { ButtonProps } from '@mui/material';

export type AddButtonProps = ButtonProps;

const AddButton = ({ children = 'Add', ...otherProps }: AddButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon width={18} height={18} />}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default AddButton;
