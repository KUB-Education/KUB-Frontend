import { Button } from './styles';
import { ButtonProps } from '@mui/material';
import EditIcon from '@/common/assets/icons/books.svg?react';

export type EditButtonProps = ButtonProps;

const DetailsButton = ({
  children = 'Details',
  ...otherProps
}: EditButtonProps) => {
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

export default DetailsButton;
