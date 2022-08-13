// import { Form } from 'formik';

import type { Customer } from '@prisma/client';
import Section from 'components/Section';
import { useEffect, useState } from 'react';
import { list } from 'services/customers';

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    list().then(setCustomers);
  }, []);

  return (
    <Section alignItems="center" className="h-96" justifyContent="center" title="Customers">
      <pre>{JSON.stringify(customers, null, 2)}</pre>
    </Section>
  );
};

export default CustomerList;
