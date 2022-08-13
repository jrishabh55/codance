export const taxes = [
  {
    label: 'GST 5%',
    value: '5%',
  },
  {
    label: 'GST 12%',
    value: '12%',
  },
  {
    label: 'GST 18%',
    value: '18%',
  },
  {
    label: 'GST 28%',
    value: '28%',
  },
];

export type InvoiceFormValues = {
  discountName: string;
  discountType: string;
  discountValue: number;
  items: {
    description: string;
    quantity: number;
    rate: number;
    taxes: {
      amount: `${number}%`;
    }[];
  }[];
};

export const calculateTaxes = (values: InvoiceFormValues) => {
  const { items } = values;
  const taxesObj: Record<`${number}%`, number> = {};

  items.forEach((item) => {
    item.taxes.forEach((tax) => {
      if (!taxesObj[tax.amount]) {
        taxesObj[tax.amount] = 0;
      }
      const amount = item.quantity * item.rate;
      const taxPercentage = parseInt(tax.amount, 10) / 100;
      taxesObj[tax.amount] += amount * taxPercentage;
    });
  });

  const parsedTaxes: Record<string, number> = Object.entries(taxesObj).reduce(
    (taxSum, [value, amount]) => ({ ...taxSum, [taxes.find((t) => t.value === value)?.label ?? '']: amount }),
    {},
  );

  delete parsedTaxes[''];

  return parsedTaxes;
};

export const calculateInvoices = (values: InvoiceFormValues) => {
  const { items } = values;

  const subTotal = items.reduce((itemsSum, item) => {
    const totalTaxPercentage = item.taxes.reduce((taxSum, tax) => taxSum + parseInt(tax.amount, 10) || 0, 0);
    console.log('🚀 ~ file: invoices.ts ~ line 62 ~ subTotal ~ totalTaxPercentage', totalTaxPercentage);
    const amount = item.quantity * item.rate;
    const taxAmount = (amount * totalTaxPercentage) / 100;
    return itemsSum + amount + taxAmount;
  }, 0);

  const discount = values.discountType === '$' ? values.discountValue : subTotal * (values.discountValue / 100);

  const total = subTotal - discount;

  return { discount, subTotal, total };
};
