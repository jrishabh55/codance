import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AddCircle, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import FormField, { FormFieldProps } from 'components/FormField';
import Section from 'components/Section';
import Select from 'components/Select';
import { FC, useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from 'utils';
import { calculateTaxes, InvoiceFormValues } from 'utils/invoices';

const discountType = [
  { label: '%', value: '%' },
  { label: '$', value: '$' },
];

export type CalculationSectionProps = {
  formik: FormFieldProps<InvoiceFormValues>['formik'];
  gridTemplateColumns: string;
  discount?: number | string;
  subTotal?: number | string;
};
export const CalculationSection: FC<CalculationSectionProps> = ({ discount = '$0.00', formik, gridTemplateColumns, subTotal = 0 }) => {
  const [showDiscount, setShowDiscount] = useState(false);
  const [parent] = useAutoAnimate();
  const { setValues } = formik;

  const taxes = useMemo(() => calculateTaxes(formik.values), [formik.values]);

  const toggleDiscount = useCallback(() => setShowDiscount((d) => !d), []);

  useEffect(() => {
    if (showDiscount) {
      setValues((values) => ({ ...values, discountName: 'Discount', discountType: '$', discountValue: 0 }));
      return;
    }

    setValues((values) => ({ ...values, discountValue: 0 }));
  }, [showDiscount, setValues]);

  return (
    <Section display="flex" flexDirection="column" gap={2}>
      <Box columnGap={2} component="section" display="grid" gridTemplateColumns={gridTemplateColumns}>
        <div></div>
        <div></div>
        <Typography textAlign="right">Sub Total</Typography>
        <Box textAlign="right">{formatCurrency(subTotal)}</Box>
      </Box>
      <Box ref={parent} gap={2}>
        {showDiscount && (
          <Box alignItems="center" columnGap={2} component="section" display="grid" gridTemplateColumns={gridTemplateColumns}>
            <Box alignItems="center" columnGap={4} display="flex" justifyContent="space-between">
              <Box className="ml-auto">
                <FormField formik={formik} id="discountName" inputProps={{ className: 'text-right' }} label="discount" size="small" />
              </Box>
            </Box>
            <Box>
              <FormField formik={formik} id="discountValue" inputProps={{ min: 1 }} label="" size="small" type="number" />
            </Box>
            <Box>
              <Select fullWidth formik={formik} id="discountType" label="" options={discountType} size="small" />
            </Box>
            <Box textAlign="right">{formatCurrency(discount)}</Box>
            <Box alignItems="center" display="grid">
              <IconButton onClick={toggleDiscount}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
        {!showDiscount && (
          <Box columnGap={2} component="section" display="grid" gridTemplateColumns={gridTemplateColumns} justifyContent="flex-end">
            <Button className="col-span-2 col-start-2 ml-auto" startIcon={<AddCircle />} onClick={toggleDiscount}>
              Discount
            </Button>
          </Box>
        )}
        {Object.entries(taxes).map(([key, value]) => (
          <Box key={key} component="section" display="grid" gap={2} gridTemplateColumns={gridTemplateColumns}>
            <Box className="col-start-3" textAlign="right">
              <Typography>{key}</Typography>
            </Box>
            <Box className="col-start-4" textAlign="right">
              <Typography>{formatCurrency(value)}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
};
