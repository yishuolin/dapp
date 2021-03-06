import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { ethers } from 'ethers';
import styled from '@emotion/styled';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NavBar, Button } from '../../components';
import { CONTRACT_ADDRESS, formatSentence, createArt } from '../../utils';
import MyNFT from '../../artifacts/contracts/nft.sol/MyToken.json';

const Main = styled.div`
  height: 100vh;
  color: #fff;
`;

const Title = styled.h4`
  font-size: 3rem;
  text-align: center;
  color: #fff;
`;

const TextField = styled.div`
  width: 60%;
  min-height: 100px;
  max-height: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const TogglesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  button {
    margin: 0 10px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Loading = styled.div`
  color: #fff;
`;

const Create = () => {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const getImage = async () => {
    // TODO: need to check if the selected words are valid
    setLoading(true);
    await createArt(selected, (img) => {
      setImage(img);
      setLoading(false);
    });
  };

  const updateSelected = (e, newSelected) => {
    setSelected(newSelected);
  };

  const getNftData = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const walletAddr = accounts[0];
    if (!walletAddr) {
      return;
    }
    setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, MyNFT.abi, signer);

    const nfts = await contract.listUserNFTs(CONTRACT_ADDRESS, walletAddr);
    const test = [];
    for (let i = 0; i < nfts.length; i++) {
      const tokenURI = await contract.tokenURI(nfts[i]);
      const response = await fetch(tokenURI);
      const metadata = await response.json();
      test.push(metadata.name);
    }
    setLoading(false);
    setWords(test);
  };

  useEffect(() => {
    getNftData();
  }, []);

  const handleMint = async () => {
    if (!window || !window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    alert('Comming soon...');
  };

  useEffect(() => {
    imageRef.current.src = image;
  }, [image]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <title>Dapp Final Project</title>
        <meta name="description" content="Dapp Final Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <NavBar />
        <Title>Select Your Text</Title>
        <TextField>{formatSentence(selected)}</TextField>
        <TogglesContainer>
          <ToggleButtonGroup
            value={selected}
            onChange={updateSelected}
            color="primary">
            {words.map((word, index) => {
              return (
                <ToggleButton key={index} value={`${word}-${index}`}>
                  {word}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </TogglesContainer>

        <ButtonContainer>
          <Button
            glowOnHover
            onClick={getImage}
            disabled={!selected.length}
            variant="filled">
            Generate
          </Button>
          <Button
            glowOnHover
            onClick={handleMint}
            disabled={!image.length}
            variant="filled">
            Mint
          </Button>
        </ButtonContainer>

        <ImageContainer>
          {loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <img ref={imageRef} src={image}></img>
          )}
        </ImageContainer>
      </Main>
    </ThemeProvider>
  );
};

export default Create;
