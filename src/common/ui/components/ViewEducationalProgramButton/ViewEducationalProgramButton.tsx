// import AddIcon from '@/common/assets/icons/add.svg?react';
import { Button } from './styles';
import { ButtonProps } from '@mui/material';

export type ViewEducationalProgramButtonProps = ButtonProps;

const ViewEducationalProgramButton = ({
  children = 'view educational programs',
  ...otherProps
}: ViewEducationalProgramButtonProps) => {
  return (
    <Button
      variant="contained"
      // startIcon={<AddIcon width={18} height={18} />}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default ViewEducationalProgramButton;
