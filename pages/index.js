import Head from 'next/head';
import styled from '@emotion/styled';
import Web3 from 'web3';
import { NavBar, NftCard } from '../components';

const Main = styled.div`
  background: #000;
  height: 100vh;
`;

const Title = styled.h3`
  font-size: 3rem;
  text-align: center;
  color: #fff;
  span {
    text-shadow: 0 0 40px rgb(192 219 255 / 75%), 0 0 32px rgb(65 120 255 / 24%);
    background: linear-gradient(to right, #30cfd0, #c43ad6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 0 auto;
`;

export default function Home() {
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
          Own your <span>TEXT</span>.
        </Title>

        <Container>
          <NftCard
            tokenId={0}
            getCount={() => {}}
            contentId={'QmYFwsqNqqCV7PEMrGwJKfy4wVmM1mZ5Uaamr2CQM2G8rb'}
          />
          <NftCard
            tokenId={1}
            getCount={() => {}}
            contentId={'QmQdaS4zXrk2yT7LFPWKyYf87Lq1Y3siwerRJdJVAJd8du'}
          />
          <NftCard
            tokenId={2}
            getCount={() => {}}
            contentId={'QmQdaS4zXrk2yT7LFPWKyYf87Lq1Y3siwerRJdJVAJd8du'}
          />
        </Container>
      </Main>
    </>
  );
}
