import Head from 'next/head';
import styled from '@emotion/styled';
import { jsx, css, keyframes } from '@emotion/react';
import ReactRotatingText from 'react-rotating-text';
import Web3 from 'web3';
import { NavBar, NftCard } from '../components';

const Main = styled.div`
  background: #000;
  height: 100vh;
`;

const BlinkingCursor = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Title = styled.h3`
  font-size: 3rem;
  text-align: center;
  color: #fff;
  .react-rotating-text-cursor {
    animation: ${BlinkingCursor} 1s cubic-bezier(0.68, 0.01, 0.01, 0.99) 0s
      infinite;
  }
`;

const GlowWithGradient = styled.span`
  text-shadow: 0 0 40px rgb(192 219 255 / 75%), 0 0 32px rgb(65 120 255 / 24%);
  background: linear-gradient(to right, #30cfd0, #c43ad6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 0 auto;
`;

export default function Home() {
  const tokens = [0, 1, 2];
  // TODO: duplicate
  const connectWallet = async () => {
    if (!window || !window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Dapp Final Project</title>
        <meta name="description" content="Dapp Final Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <NavBar connectWallet={connectWallet} />
        <Title>
          <ReactRotatingText
            items={['Own', 'Enjoy', 'Love']}
            typingInterval="120"
            deletingInterval="100"
          />{' '}
          your <GlowWithGradient>TEXT</GlowWithGradient>.
        </Title>
        <Container>
          {tokens.map((tokenId) => (
            <NftCard key={tokenId} tokenId={tokenId} getCount={() => {}} />
          ))}
        </Container>
      </Main>
    </>
  );
}
