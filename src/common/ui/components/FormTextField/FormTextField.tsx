/* eslint-disable react/display-name */
import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

export type FormTextFieldProps = OutlinedInputProps;

const FormTextField = forwardRef<typeof OutlinedInput, FormTextFieldProps>(
  (props, ref) => {
    return <OutlinedInput ref={ref} notched autoComplete="off" {...props} />;
  },
);

export default FormTextField;
