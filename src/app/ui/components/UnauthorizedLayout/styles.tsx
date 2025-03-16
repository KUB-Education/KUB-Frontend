import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import { Header as CommonHeader } from '@/common/ui/components';

export const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100vh',
});

export const Content = styled('main')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const Header = styled(CommonHeader)({
  padding: '20px',
  height: '120px',
  borderBottom: 'none',
  backgroundColor: 'transparent',
});
