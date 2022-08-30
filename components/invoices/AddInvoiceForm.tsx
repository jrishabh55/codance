import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Divider } from '@mui/material';
import Section from 'components/Section';
import dayjs from 'dayjs';
import { FormikProvider, useFormik } from 'formik';
import { useMemo } from 'react';
import { calculateInvoices, InvoiceFormValues } from 'utils/invoices';

import { CalculationSection } from './CalculationSection';
import InvoiceHeadSection from './InvoiceHeadSection';
import InvoiceItemTable from './InvoiceItemTable';
import InvoiceTotalSection from './InvoiceTotalSection';

const gridColumns = '7fr 1fr 1fr 1fr 0.5fr';

const AddInvoiceForm = () => {
  const [parent] = useAutoAnimate();
  const formik = useFormik<InvoiceFormValues>({
    initialValues: {
      customer: '',
      discountName: 'Discount',
      discountType: '$',
      discountValue: 0,
      dueDate: dayjs().add(1, 'month'),
      invoiceDate: dayjs(),
      invoiceNumber: '',
      poSoNumber: '',
      services: [
        {
          description: '',
          id: 1,
          quantity: 1,
          rate: 0,
          taxes: [],
        },
      ],
    },
    onSubmit: (values) => {
      console.log('🚀 ~ file: addInvoiceForm.tsx ~ line 33 ~ AddInvoiceForm ~ values', values);
    },
  });

  const { discount, subTotal, total } = useMemo(() => calculateInvoices(formik.values), [formik.values]);

  return (
    <FormikProvider value={formik}>
      <Section ref={parent} card display="grid" gridTemplateColumns="repeat(1, minmax(0, 1fr))" rowGap={4}>
        <InvoiceHeadSection formik={formik} />
        <Divider />
        <InvoiceItemTable formik={formik} gridTemplateColumns={gridColumns} />
        <Divider />
        <CalculationSection discount={discount} formik={formik} gridTemplateColumns={gridColumns} subTotal={subTotal} />
        <Divider />
        <InvoiceTotalSection gridTemplateColumns={gridColumns} total={total} />
        <Button className="ml-auto rounded-full" type="submit" variant="contained" onClick={formik.submitForm}>
          Save and continue
        </Button>
      </Section>
    </FormikProvider>
  );
};

export default AddInvoiceForm;
