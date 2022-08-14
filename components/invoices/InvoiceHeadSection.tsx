import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Box, Button } from '@mui/material';
import { Customer } from '@prisma/client';
import DatePicker from 'components/DatePicker';
import FormField, { FormFieldProps } from 'components/FormField';
import Section from 'components/Section';
import Select from 'components/Select';
import { FC, useEffect, useMemo, useState } from 'react';
import { list } from 'services/customers';

export type InvoiceHeadSectionProps = {
  formik: FormFieldProps['formik'];
};

const InvoiceHeadSection: FC<InvoiceHeadSectionProps> = ({ formik }) => {
  const [parent] = useAutoAnimate();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const customersSelect = useMemo(() => customers.map((customer) => ({ label: customer.customerName, value: customer.id })), [customers]);
  const currentCustomer = useMemo(
    () => customers.find((customer) => customer.id === formik.values.customer),
    [customers, formik.values.customer],
  );

  useEffect(() => {
    list().then(setCustomers);
  }, []);

  return (
    <Section display="flex">
      <Section display="grid" wrapperProps={{ className: 'flex-grow' }}>
        <Box ref={parent} display="grid" width={200}>
          {!currentCustomer && <Select formik={formik} id="customer" label="" options={customersSelect} />}
          {currentCustomer && (
            <Box>
              Bill To:
              <br />
              <strong>{currentCustomer.customerName}</strong>
              <br />
              {currentCustomer.billingAddress1}, {currentCustomer.billingAddress2}
              <br />
              {currentCustomer.city}, {currentCustomer.state}, {currentCustomer.postal}
              <br />
              {currentCustomer.country}
              <br />
              <br />
              {currentCustomer.accountNumber}
              {currentCustomer.email}
              <Button size="small" variant="text" onClick={() => formik.setFieldValue('customer', '')}>
                Edit Customer
              </Button>
            </Box>
          )}
        </Box>
      </Section>
      <Section display="grid" gap={2}>
        <FormField formik={formik} id="invoiceNumber" label="Invoice Number" size="small" />
        <FormField formik={formik} id="poSoNumber" label="P.O./S.O. Number" size="small" />
        <FormField Field={DatePicker} formik={formik} id="invoiceDate" label="Invoice Date" size="small" />
        <FormField Field={DatePicker} formik={formik} id="dueDate" label="Due Date" size="small" />
      </Section>
    </Section>
  );
};

export default InvoiceHeadSection;
