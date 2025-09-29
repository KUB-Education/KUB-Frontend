import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps,
  styled,
} from '@mui/material';

export type CircularProgressProps = MuiCircularProgressProps;

const CircularProgress = styled(MuiCircularProgress)({
  color: '#3BB3FF',
});

export default CircularProgress;
