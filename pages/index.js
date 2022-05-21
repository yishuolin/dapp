import Head from 'next/head';
import styled from '@emotion/styled';
import { NavBar, Intro, NftGallery, Footer } from '../components';

const Main = styled.div`
  height: 100vh;
`;

export default function Home() {
  const tokens = Array(12)
    .fill(0)
    .map((_, i) => i);

  return (
    <>
      <Head>
        <title>Dapp Final Project</title>
        <meta name="description" content="Dapp Final Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <NavBar />
        <Intro />
        <NftGallery tokens={tokens} />
        <Footer />
      </Main>
    </>
  );
}
