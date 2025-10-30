import { Button } from './styles';
import { ButtonProps } from '@mui/material';
import DetailsIcon from '@/common/assets/icons/books.svg?react';

export type DetailsButtonProps = ButtonProps;

const DetailsButton = ({ children = 'Details', ...otherProps }: DetailsButtonProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={<DetailsIcon width={18} height={18} />}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default DetailsButton;
