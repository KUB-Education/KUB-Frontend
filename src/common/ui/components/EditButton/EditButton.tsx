import { Button } from './styles';
import { ButtonProps } from '@mui/material';
import EditIcon from '@/common/assets/icons/edit.svg?react';

export type EditButtonProps = ButtonProps;

const EditButton = ({ children = 'Edit', ...otherProps }: EditButtonProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={<EditIcon width={18} height={18} />}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default EditButton;
