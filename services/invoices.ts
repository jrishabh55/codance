import { Customer, Prisma, Service } from '@prisma/client';
import { InvoiceFormValues } from 'utils/invoices';

export type TaxAndInvoiceType = Prisma.InvoiceCreateInput & {
  taxes: { serviceId: Service['id']; name: string; value: string; id: string }[];
  discount: Pick<InvoiceFormValues, 'discountName' | 'discountType' | 'discountValue'>;
};

export const addInvoice = async (invoice: TaxAndInvoiceType): Promise<Customer> => {
  return fetch('/api/invoice/add', {
    body: JSON.stringify(invoice),
    headers: {
      contentType: 'application/json',
    },
    method: invoice?.id ? 'PUT' : 'POST',
  }).then((res) => res.json());
};

export const listInvoice = async (): Promise<Customer[]> => {
  return fetch('/api/invoice/list').then((res) => res.json());
};
