import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import { ethers } from 'ethers';
import styled from '@emotion/styled';
import Web3 from 'web3';
import { NavBar, NFTText } from '../components';
import MyNFT from '../artifacts/contracts/nft.sol/MyToken.json';

const Title = styled.h3`
  font-size: 4rem;
  margin-y: 15rem;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
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
    <div>
      <Head>
        <title>Dapp Final Project</title>
        <meta name="description" content="Dapp Final Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar connectWallet={connectWallet} />
        <Title>Welcome!</Title>
        <Link href="/create">
          <Button variant="contained">Create</Button>
        </Link>

        <Container>
          <div>
            <NFTText
              tokenId={0}
              getCount={() => {}}
              contentId={'QmYFwsqNqqCV7PEMrGwJKfy4wVmM1mZ5Uaamr2CQM2G8rb'}
            />
            <NFTText
              tokenId={1}
              getCount={() => {}}
              contentId={'QmQdaS4zXrk2yT7LFPWKyYf87Lq1Y3siwerRJdJVAJd8du'}
            />
          </div>
        </Container>
      </main>

      {/* 
      <Footer>
        <div>Decentralized Applications Design and Practice 2022 @NTU</div>
      </Footer> */}
    </div>
  );
}
