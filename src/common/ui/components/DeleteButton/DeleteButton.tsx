import DeleteIcon from '@/common/assets/icons/delete.svg?react';
import { Button } from './styles';
import { ButtonProps } from '@mui/material';

export type DeleteButtonProps = ButtonProps;

const DeleteButton = ({
  children = 'Delete',
  ...otherProps
}: DeleteButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<DeleteIcon width={18} height={18} />}
      color="error"
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default DeleteButton;
