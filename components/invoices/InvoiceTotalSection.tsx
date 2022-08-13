import { Box } from '@mui/material';
import Section from 'components/Section';
import type { FC } from 'react';
import { formatCurrency } from 'utils';

export type InvoiceTotalSectionProps = {
  gridTemplateColumns: string;
  total?: number | string;
};
const InvoiceTotalSection: FC<InvoiceTotalSectionProps> = ({ gridTemplateColumns, total = '$0.00' }) => {
  return (
    <Section display="grid" gap={2} gridTemplateColumns={gridTemplateColumns}>
      <Box className="col-span-3" textAlign="right">
        Total
      </Box>
      <Box alignItems="center" display="grid" textAlign="right">
        {formatCurrency(total)}
      </Box>
      <Box>-</Box>
    </Section>
  );
};

export default InvoiceTotalSection;
