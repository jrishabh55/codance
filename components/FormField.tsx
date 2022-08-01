import { TextField, TextFieldProps } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';

type Field = typeof TextField;

export type FormFieldProps = {
  Field?: Field;
  formik: ReturnType<typeof useFormik<any>>;
  id: string;
} & Omit<TextFieldProps, 'Filed' | 'id'>;

const FormField: FC<FormFieldProps> = ({ Field, formik, id, ...rest }) => {
  if (!Field) {
    throw new Error('Field is required');
  }

  return (
    <Field
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && (formik.errors[id] as any)}
      id={id}
      label={id.replaceAll(/[-_]/g, ' ')}
      name={id}
      value={formik.values[id]}
      onChange={formik.handleChange}
      {...rest}
    />
  );
};

FormField.defaultProps = {
  Field: TextField,
  fullWidth: true,
};

export default FormField;
