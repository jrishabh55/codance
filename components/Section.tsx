import { Box, BoxProps, Divider, PaperProps, Typography } from '@mui/material';
import { FCC } from 'globalTypes';
import { forwardRef } from 'react';

import Paper from './Paper';

type SectionBaseProps = BoxProps & {
  title?: string;
  card?: boolean;
};

type SectionPaperProps = SectionBaseProps & {
  card?: true;
  wrapperProps?: PaperProps;
};

type SectionBoxProps = SectionBaseProps & {
  card?: false;
  wrapperProps?: BoxProps;
};

export type SectionProps = SectionPaperProps | SectionBoxProps;

const Section: FCC<SectionProps> = forwardRef(({ card, children, title, wrapperProps, ...boxProps }, ref) => {
  const Wrapper = card ? Paper : Box;
  return (
    <Wrapper {...(wrapperProps as any)} ref={ref}>
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
});

Section.displayName = 'Section';

export default Section;
