import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AddCircle, Delete } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import FormField, { FormFieldProps } from 'components/FormField';
import Select from 'components/Select';
import { FieldArray } from 'formik';
import { FC, useMemo } from 'react';
import { formatCurrency } from 'utils';
import { calculateTax, InvoiceFormValues, taxes } from 'utils/invoices';

export type InvoiceItemRowProps = {
  formik: FormFieldProps<InvoiceFormValues>['formik'];
  gridTemplateColumns: string;
  index: number;
  remove?: () => void;
};

const InvoiceItemRow: FC<InvoiceItemRowProps> = ({ formik, gridTemplateColumns, index, remove }) => {
  const amount = formik.values.services[index].quantity * formik.values.services[index].rate;
  const taxValues = formik.values.services[index].taxes;

  const taxOptions = useMemo(() => {
    return taxes.map((tax) => ({ ...tax, disabled: !!taxValues.find((t: { amount: string }) => t.amount === tax.value) }));
  }, [taxValues]);

  const [parent] = useAutoAnimate();

  return (
    <Box ref={parent} component="article" display="flex" flexDirection="column" gap={2}>
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
            {taxValues.map((tax, i: number) => (
              <Box key={tax.id} className="col-start-3" display="grid" gap={2} gridTemplateColumns={gridTemplateColumns}>
                <Box alignItems="center" className="ml-auto" display="flex">
                  {i === 0 ? 'Tax' : ''}
                </Box>
                <Box className="col-span-2">
                  <Select fullWidth formik={formik} id={`services.${index}.taxes.${i}.amount`} label="" options={taxOptions} size="small" />
                </Box>
                <Box alignItems="center" display="grid" textAlign="right">
                  {formatCurrency(calculateTax(formik.values.services[index], tax.amount))}
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
                startIcon={<AddCircle />}
                variant="text"
                onClick={() => push({ amount: '', id: Date.now() })}>
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
