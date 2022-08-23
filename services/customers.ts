import { Customer, Prisma } from '@prisma/client';

export const add = async (customer: Prisma.CustomerCreateInput): Promise<Customer> => {
  return fetch('/api/customers/add', {
    body: JSON.stringify(customer),
    headers: {
      contentType: 'application/json',
    },
    method: 'POST',
  }).then((res) => res.json());
};

export const list = async (): Promise<Customer[]> => {
  return fetch('/api/customers/list').then((res) => res.json());
};
