import BooksIcon from '@/common/assets/icons/books.svg?react';
import { Button } from './styles';
import { ButtonProps } from '@mui/material';

export type InfoButtonProps = ButtonProps;

const InfoButton = ({ children = 'Info', ...otherProps }: InfoButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<BooksIcon width={18} height={18} />}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default InfoButton;
