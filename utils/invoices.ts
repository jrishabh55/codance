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
  services: {
    description: string;
    quantity: number;
    rate: number;
    taxes: {
      amount: `${number}%`;
    }[];
  }[];
};

export const calculateTaxes = (values: InvoiceFormValues) => {
  const { services } = values;
  const taxesObj: Record<`${number}%`, number> = {};

  services.forEach((item) => {
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

export const calculateTax = (service: InvoiceFormValues['services'][0], taxValue: string) => {
  const taxPercentage = (parseInt(taxValue, 10) || 0) / 100;
  const amount = service.quantity * service.rate;
  return amount * taxPercentage;
};

export const calculateInvoices = (values: InvoiceFormValues) => {
  const { services } = values;

  const subTotal = services.reduce((itemsSum, item) => {
    const totalTaxPercentage = item.taxes.reduce((taxSum, tax) => taxSum + parseInt(tax.amount, 10) || 0, 0);

    const amount = item.quantity * item.rate;
    const taxAmount = (amount * totalTaxPercentage) / 100;
    return itemsSum + amount + taxAmount;
  }, 0);

  const discount = values.discountType === '$' ? values.discountValue : subTotal * (values.discountValue / 100);

  const total = subTotal - discount;

  return { discount, subTotal, total };
};
