import { styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: 85,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: '1px solid #8c8c96',
  padding: '20px 12px 20px 18px',
  background: '#FBFBFE',
  color: '#050315',
  boxShadow: 'none',
}));
