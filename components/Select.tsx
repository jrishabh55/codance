import type { SelectProps as SelectBaseProps } from '@mui/material';
import { capitalize, FormControl, InputLabel, MenuItem, Select as SelectBase } from '@mui/material';
import get from 'lodash.get';
import { FC, memo } from 'react';

import type { FormFieldProps } from './FormField';

export type SelectProps = Omit<FormFieldProps, 'Field'> &
  SelectBaseProps & {
    options: Array<{ label: string; value: string; disabled?: boolean }>;
  };

const Select: FC<SelectProps> = ({ formik, fullWidth, id, label, name, options, ...rest }) => {
  const key = name ?? id;
  const _label = label ?? capitalize(key);
  const value = get(formik.values, key);

  return (
    <FormControl fullWidth={fullWidth}>
      {_label && <InputLabel id={`label-${key}`}>{_label}</InputLabel>}
      <SelectBase id={key} labelId={`label-${key}`} name={key} value={value} onChange={formik.handleChange} {...rest}>
        {options.map((option) => (
          <MenuItem key={option.value} disabled={option.disabled === true} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectBase>
    </FormControl>
  );
};

export default memo(Select);
