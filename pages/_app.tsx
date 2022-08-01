import '../styles/globals.scss';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from 'components/Layout';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { FC, ReactElement, ReactNode } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#03a9f4',
    },
    secondary: {
      dark: '#26a4e4',
      main: '#f50057',
    },
    text: {
      primary: '#CCCCCC',
    },
  },
});

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
};

export default MyApp;
