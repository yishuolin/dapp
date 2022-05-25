import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { NavBar, Model, Intro, NftGallery, Team, Footer } from '../components';

const ModelContainer = styled.div`
  height: 100vh;
  button {
    font-weight: bold;
    position: absolute;
    top: 90%;
    left: calc(50% - 80px);
    color: #fff;
    font-size: 18px;
    padding: 12px 32px;
    background-image: linear-gradient(
      to right,
      rgb(243 196 24),
      rgb(209 58 219)
    );
    border: 0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 15px 0px;
    }
  }
`;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showSpline, setShowSpline] = useState(true);
  const [showMain, setShowMain] = useState(false);

  const handleExplore = () => {
    setShowMain(true);
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    });
    setTimeout(() => {
      setShowSpline(false);
    }, 1000);
  };

  // TODO: handle loading

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
      <>
        {showSpline && (
          <ModelContainer>
            <Model callback={() => setLoading(false)} />
            <button onClick={handleExplore}>LET'S EXPLORE!</button>
          </ModelContainer>
        )}

        {showMain && (
          <>
            <NavBar />
            <Intro />
            <NftGallery tokens={tokens} />
            <Team />
            <Footer />
          </>
        )}
      </>
    </>
  );
}
