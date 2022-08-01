// import { Form } from 'formik';

import { Button, Divider } from '@mui/material';
import FormField from 'components/FormField';
import Layout from 'components/Layout';
import Section from 'components/Section';
import { useFormik } from 'formik';
import { ReactNode } from 'react';
import { add } from 'services/customers';

const CustomersAdd = () => {
  const formik = useFormik({
    initialValues: {
      'account-number': '',
      'billing-address-1': '',
      'billing-address-2': '',
      city: '',
      country: '',
      'customer-name': '',
      email: '',
      'first-name': '',
      'last-name': '',
      phone: '',
      postal: '',
      state: '',
      website: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const customer = {
        accountNumber: values['account-number'],
        billingAddress1: values['billing-address-1'],
        billingAddress2: values['billing-address-2'],
        city: values.city,
        country: values.country,
        customerName: values['customer-name'],
        email: values.email,
        firstName: values['first-name'],
        lastName: values['last-name'],
        phone: values.phone,
        postal: values.postal,
        state: values.state,
        website: values.website,
      };

      await add(customer);
      setSubmitting(true);
    },
  });

  return (
    <Section alignItems="center" className="h-96" justifyContent="center" title="Yahoo">
      <form className="mx-auto grid max-w-4xl grid-cols-1 gap-4 p-4" onSubmit={formik.handleSubmit}>
        <Section card alignItems="center" className="space-y-4" justifyContent="center">
          <FormField required formik={formik} id="customer-name" type="customer" />
        </Section>
        <Divider className="col-span-full" />
        <Section card columnGap={1} display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))" rowGap={2}>
          <FormField formik={formik} id="first-name" />
          <FormField formik={formik} id="last-name" />
          <FormField formik={formik} id="email" />
          <FormField formik={formik} id="phone" type="tel" />
        </Section>
        <Divider className="col-span-full" />
        <Section card columnGap={1} display="grid" gridTemplateColumns="repeat(1, minmax(0, 1fr))" rowGap={2}>
          <FormField formik={formik} id="account-number" />
          <FormField formik={formik} id="website" />
        </Section>
        <Divider className="col-span-full" />
        <Section card columnGap={1} display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))" rowGap={2}>
          <FormField className="col-span-2" formik={formik} id="billing-address-1" />
          <FormField className="col-span-2" formik={formik} id="billing-address-2" />
          <FormField formik={formik} id="country" />
          <FormField formik={formik} id="state" />
          <FormField formik={formik} id="city" />
          <FormField formik={formik} id="postal" />
        </Section>

        <Button className="col-span-full" color="primary" disabled={formik.isSubmitting} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Section>
  );
};

CustomersAdd.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default CustomersAdd;
