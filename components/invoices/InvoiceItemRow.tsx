import { Add, Delete } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import FormField, { FormFieldProps } from 'components/FormField';
import Select from 'components/Select';
import { FieldArray } from 'formik';
import { FC } from 'react';
import { formatCurrency } from 'utils';
import { taxes } from 'utils/invoices';

export type InvoiceItemRowProps = {
  formik: FormFieldProps['formik'];
  gridTemplateColumns: string;
  index: number;
  remove?: () => void;
};

const InvoiceItemRow: FC<InvoiceItemRowProps> = ({ formik, gridTemplateColumns, index, remove }) => {
  const amount = parseInt(formik.values.services[index].quantity, 10) * parseInt(formik.values.services[index].rate, 10) || 0;

  return (
    <Box component="article" display="flex" flexDirection="column" gap={2}>
      <Box display="grid" gap={2} gridTemplateColumns={gridTemplateColumns}>
        <Box>
          <FormField formik={formik} id="description" label="" name={`services.${index}.description`} size="small" />
        </Box>
        <Box>
          <FormField
            formik={formik}
            id="quantity"
            inputProps={{ min: 1 }}
            label=""
            name={`services.${index}.quantity`}
            size="small"
            type="number"
          />
        </Box>
        <Box>
          <FormField
            formik={formik}
            id="rate"
            inputProps={{ min: 1 }}
            label=""
            name={`services.${index}.rate`}
            size="small"
            type="number"
          />
        </Box>
        <Box alignItems="center" display="grid" textAlign="right">
          {formatCurrency(amount)}
        </Box>
        <Box alignItems="center" display="grid">
          {remove && (
            <IconButton onClick={remove}>
              <Delete fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      <FieldArray name={`services.${index}.taxes`}>
        {({ push, remove }) => (
          <>
            {formik.values.services[index].taxes.map((tax: any, i: number) => (
              <Box key={tax.value} className="col-start-3" display="grid" gap={2} gridTemplateColumns={gridTemplateColumns}>
                <Box alignItems="center" className="ml-auto" display="flex">
                  {i === 0 ? 'Tax' : ''}
                </Box>
                <Box className="col-span-2">
                  <Select fullWidth formik={formik} id={`services.${index}.taxes.${i}.amount`} label="" options={taxes} size="small" />
                </Box>
                <Box alignItems="center" display="grid" textAlign="right">
                  {tax.amount}
                </Box>
                <Box alignItems="center" display="grid">
                  <IconButton onClick={() => remove(i)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Box display="grid" gap={2} gridTemplateColumns={gridTemplateColumns}>
              <Button
                className="col-span-1 col-start-2"
                color="primary"
                endIcon={<Add />}
                variant="outlined"
                onClick={() => push({ amount: '' })}>
                Tax
              </Button>
            </Box>
          </>
        )}
      </FieldArray>
    </Box>
  );
};

export default InvoiceItemRow;
