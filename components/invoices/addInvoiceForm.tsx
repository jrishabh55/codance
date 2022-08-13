import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Divider } from '@mui/material';
import Section from 'components/Section';
import { FormikProvider, useFormik } from 'formik';
import { useMemo } from 'react';
import { calculateInvoices } from 'utils/invoices';

import { CalculationSection } from './CalculationSection';
import InvoiceHeadSection from './InvoiceHeadSection';
import InvoiceItemTable from './InvoiceItemTable';
import InvoiceTotalSection from './InvoiceTotalSection';

const AddInvoiceForm = () => {
  const [parent] = useAutoAnimate();
  const formik = useFormik({
    initialValues: {
      customer: '',
      discountName: 'Discount',
      discountType: '$',
      discountValue: 0,
      items: [
        {
          description: '',
          quantity: 1,
          rate: 0.0,
          taxes: [],
        },
      ],
    },
    onSubmit: () => {
      // console.log something here
    },
  });

  const { discount, subTotal, total } = useMemo(() => calculateInvoices(formik.values), [formik.values]);

  return (
    <FormikProvider value={formik}>
      <Section ref={parent} card display="grid" gridTemplateColumns="repeat(1, minmax(0, 1fr))" rowGap={4}>
        <InvoiceHeadSection formik={formik} />
        <Divider />
        <InvoiceItemTable formik={formik} gridTemplateColumns="7fr 1fr 1fr 1fr 0.5fr" />
        <Divider />
        <CalculationSection discount={discount} formik={formik} gridTemplateColumns="7fr 1fr 1fr 1fr 0.5fr" subTotal={subTotal} />
        <Divider />
        <InvoiceTotalSection gridTemplateColumns="7fr 1fr 1fr 1fr 0.5fr" total={total} />
      </Section>
    </FormikProvider>
  );
};

export default AddInvoiceForm;
