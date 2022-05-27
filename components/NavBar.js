import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Button } from '.';
import { useWalletStatus } from '../hooks';

const Container = styled.div`
  display: flex;
  width: 97%;
  // z-index: 20;
  margin: 0 auto;
  justify-content: space-between;
  // position: fixed;
  // background: #000;
  div {
    margin: 1.5rem 1rem;
  }
  button {
    margin-right: 1.3rem;
  }
`;

const Logo = styled.div`
  color: #fff;
  margin: 1rem;
  margin-left: 2rem;
  font-size: 40px;
  cursor: pointer;
  font-weight: bold;
  text-shadow: 0 0 50px rgb(192 219 255 / 75%), 0 0 32px rgb(65 120 255 / 24%);
`;

const NavBar = () => {
  const [connectWallet, isConnected] = useWalletStatus();

  return (
    <Container>
      <Link href="/">
        <Logo>The TEXT</Logo>
      </Link>
      <div>
        <Link href="/create">
          <Button variant="outlined">Create Your Art</Button>
        </Link>
        {isConnected ? (
          <Button variant="filled">Connected</Button>
        ) : (
          <Button variant="outlined" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
    </Container>
  );
};

export default NavBar;
