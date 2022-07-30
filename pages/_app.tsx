import '../styles/globals.scss';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from 'components/Layout';
import { AppProps } from 'next/app';
import { FC } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
