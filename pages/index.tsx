import Head from 'next/head';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Codeation.io next-js template</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
    </div>
  );
};

export default Home;
