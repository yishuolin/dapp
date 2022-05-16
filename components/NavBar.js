import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Button } from '.';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin: 1rem;
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

// TODO: show connect wallet button only if not connected
function NavBar({ connectWallet }) {
  return (
    <Container>
      <Link href="/">
        <Logo>The Text</Logo>
      </Link>
      <div>
        <Link href="/create">
          <Button variant="outlined">Create Your Art</Button>
        </Link>
        <Button variant="outlined" onClick={connectWallet}>
          Connect Wallet
        </Button>
      </div>
    </Container>
  );
}
export default NavBar;
