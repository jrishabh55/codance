import { TextField, TextFieldProps } from '@mui/material';
import { useFormik } from 'formik';
import get from 'lodash.get';
import { FC, memo } from 'react';

export type FormFieldProps<FormikValues, FieldProp = Record<string, any>> = {
  Field?: FC<FieldProp>;
  formik: ReturnType<typeof useFormik<FormikValues>>;
  id: string;
} & Omit<TextFieldProps, 'Filed' | 'id'>;

const FormField: FC<FormFieldProps<any>> = ({ Field, formik, id, name, ...rest }) => {
  if (!Field) {
    throw new Error('Field is required');
  }

  const key = name ?? id;
  const value = get(formik.values, key);
  return (
    <Field
      error={formik.touched[key] && Boolean(formik.errors[key])}
      helperText={formik.touched[key] && formik.errors[key]}
      id={key}
      label={key.replaceAll(/[-_]/g, ' ')}
      name={key}
      value={value}
      onChange={formik.handleChange}
      {...rest}
    />
  );
};

FormField.defaultProps = {
  Field: TextField,
  fullWidth: true,
};

export default memo(FormField);
