import { TextField, TextFieldProps } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { ComponentProps, FC, useCallback } from 'react';

export type DatePickerProps = ComponentProps<typeof DesktopDatePicker> & TextFieldProps;
const DatePicker: FC<DatePickerProps> = ({ onChange, size, ...props }) => {
  const handleChange: DatePickerProps['onChange'] = useCallback(
    (date) => {
      const key = props.name ?? props.id;
      onChange({ target: { name: key, type: 'date', value: date } });
    },
    [onChange, props.name, props.id],
  );

  const renderInput = useCallback(
    (params: TextFieldProps) => {
      return <TextField size={size} {...params} />;
    },
    [size],
  );

  return <DesktopDatePicker {...props} renderInput={renderInput} onChange={handleChange} />;
};

export default DatePicker;
