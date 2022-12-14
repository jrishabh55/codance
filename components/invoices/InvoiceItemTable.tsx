import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AddCircle } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { FormFieldProps } from 'components/FormField';
import Section from 'components/Section';
import { FieldArray } from 'formik';
import { FC } from 'react';
import { InvoiceFormValues } from 'utils/invoices';

import InvoiceItemRow from './InvoiceItemRow';

export type InvoiceItemTableProps = {
  formik: FormFieldProps<InvoiceFormValues>['formik'];
  gridTemplateColumns: string;
};
const InvoiceItemTable: FC<InvoiceItemTableProps> = ({ formik, gridTemplateColumns }) => {
  const { values } = formik;
  const [parent] = useAutoAnimate();

  return (
    <Section display="flex" flexDirection="column" gap={2}>
      <Box columnGap={2} component="section" display="grid" gridTemplateColumns={gridTemplateColumns}>
        <Box>Services</Box>
        <Box>Quantity</Box>
        <Box>Rate</Box>
        <Box alignItems="center" display="grid" textAlign="right">
          Amount
        </Box>
      </Box>
      <Box ref={parent} display="flex" flexDirection="column" gap={2}>
        <FieldArray name="services">
          {({ push, remove }) => (
            <>
              {values.services.map((row, i: number) => (
                <InvoiceItemRow
                  key={row.id}
                  formik={formik}
                  gridTemplateColumns={gridTemplateColumns}
                  index={i}
                  remove={values.services?.length > 1 ? () => remove(i) : undefined}
                />
              ))}
              <Box>
                <Button
                  color="primary"
                  startIcon={<AddCircle />}
                  variant="text"
                  onClick={() => push({ description: '', id: Date.now(), quantity: 1, rate: 0, taxes: [] })}>
                  Add an item
                </Button>
              </Box>
            </>
          )}
        </FieldArray>
      </Box>
    </Section>
  );
};

export default InvoiceItemTable;
