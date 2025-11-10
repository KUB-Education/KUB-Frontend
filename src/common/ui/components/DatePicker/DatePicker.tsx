import {
  DatePicker as LibDatePicker,
  DatePickerProps as LibDatePickerProps,
} from '@mui/x-date-pickers';
import { forwardRef } from 'react';
import { createDate } from '@/common/utils';

export type DatePickerProps = LibDatePickerProps;

export type DatePickerValue = ReturnType<typeof createDate>;

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ format = 'DD/MM/YYYY', ...otherProps }: DatePickerProps, ref) => {
    return <LibDatePicker {...otherProps} format={format} ref={ref} />;
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
