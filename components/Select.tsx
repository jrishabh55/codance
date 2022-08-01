import { capitalize, FormControl, InputLabel, MenuItem, Select as SelectBase } from '@mui/material';
import { FC } from 'react';

import type { FormFieldProps } from './FormField';

export type SelectProps = Omit<FormFieldProps, 'Field'> & {
  options: Array<{ label: string; value: string }>;
};

export const Select: FC<SelectProps> = ({ formik, fullWidth, id, options }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={`label-${id}`}>{capitalize(id)}</InputLabel>
      <SelectBase
        id={id}
        label={capitalize(id)}
        labelId={`label-${id}`}
        name={id}
        value={formik.values[id]}
        onChange={(e) => formik.handleChange(e)}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectBase>
    </FormControl>
  );
};
