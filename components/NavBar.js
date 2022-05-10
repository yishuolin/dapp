import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Button,
} from '@mui/material';
import styled from '@emotion/styled';

const NavBarEnd = styled.div`
  position: absolute;
  right: 30px;
`;

function NavBar({ connectWallet }) {
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4">Text2Image</Typography>
        <NavBarEnd>
          <Button onClick={connectWallet} variant="contained" color="secondary">
            Connect Wallet
          </Button>
        </NavBarEnd>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
