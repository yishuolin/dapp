import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  color: #fff;
  margin: 1rem;
  margin-left: 2rem;
  font-size: 40px;
  cursor: pointer;
`;

const Button = styled.button`
  font-family: sans-serif;
  color: #fff;
  font-size: 18px;
  padding: 12px 32px;
  margin: 1rem;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  &:hover {
    ${(props) =>
      props.glowOnHover &&
      `
    box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 20px 0px;
    transition: all 0.3s ease;`}
    ${(props) =>
      props.outlined &&
      `
    background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
    transition: all 0.3s ease;
    `}
  }
  transition: all 0.3s ease;
  ${(props) =>
    props.outlined
      ? `
  border: 2px double transparent;
  background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)), radial-gradient(circle at left top, rgb(1, 110, 218), rgb(217, 0, 192));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  `
      : `
  background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
  border: 0;
  `}
`;

function NavBar({ connectWallet }) {
  return (
    <Container>
      <Link href="/">
        <Logo>LOGO</Logo>
      </Link>
      <div>
        <Link href="/create">
          <Button outlined>Create Your Art</Button>
        </Link>
        <Button outlined onClick={connectWallet}>
          Connect Wallet
        </Button>
      </div>
    </Container>
  );
}
export default NavBar;
