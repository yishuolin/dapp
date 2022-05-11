import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Web3 from 'web3';
import { ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import { NavBar } from '../components';

const Title = styled.h3`
  font-size: 4rem;
  margin-y: 15rem;
  text-align: center;
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
      </main>

      {/* 
      <Footer>
        <div>Decentralized Applications Design and Practice 2022 @NTU</div>
      </Footer> */}
    </div>
  );
}
