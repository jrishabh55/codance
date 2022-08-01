import { Box, BoxProps, Divider, Typography } from '@mui/material';
import { FCC } from 'globalTypes';

import Paper from './Paper';

export type SectionProps = BoxProps & {
  title?: string;
  card?: boolean;
};

const Section: FCC<SectionProps> = ({ card, children, title, ...boxProps }) => {
  const Wrapper = card ? Paper : Box;
  return (
    <Wrapper>
      {title && (
        <>
          <Typography variant="h3">{title}</Typography>
          <Divider sx={{ marginBottom: 2 }} />
        </>
      )}
      <Box flexGrow={1} width="100%" {...boxProps}>
        {children}
      </Box>
    </Wrapper>
  );
};

export default Section;
