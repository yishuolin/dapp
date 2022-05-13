import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { ethers } from 'ethers';
import styled from '@emotion/styled';
import Web3 from 'web3';
import { ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import { NavBar } from '../../components';
import MyNFT from '../../artifacts/contracts/nft.sol/MyToken.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Title = styled.h4`
  font-size: 4rem;
  margin-y: 5rem;
  text-align: center;
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

const Footer = styled.div`
  position: fixed;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

export default function Create() {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const textBaseURI = `https://gateway.pinata.cloud/ipfs/`;

  const imageRef = useRef();

  const getImage = () => {
    // TODO: need to check if the selected words are valid again
    setLoading(true);
    // TODO: move to requests.js
    const url = 'https://source.unsplash.com/random/400x300';
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        setImage(objectURL);
        setLoading(false);
      });
  };

  const formatSentence = (selected) => {
    return selected.map((word) => word.split('-')[0]).join(' ');
  };

  const updateSelected = (e, newSelected) => {
    setSelected(newSelected);
  };

  const connectWallet = async () => {
    if (!window || !window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setWalletAddress(accounts[0]);
      const web3 = new Web3(window.ethereum);
      getNftData();
    } catch (error) {
      alert(error.message);
    }
  };

  const getNftData = async () => {
    if (!walletAddress) return;
    setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // get the end user
    const signer = provider.getSigner();

    // get the smart contract
    const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);
    console.log(contract);
    // const nft = await contract.methods.tokensOfOwner(walletAddress).call();
    const balance = await contract.balanceOf(walletAddress);
    console.log('wallet address: ', walletAddress);
    console.log(balance.toString());

    const nfts = await contract.listUserNFTs(contractAddress, walletAddress);
    console.log(nfts);

    const test = [];
    for (let i = 0; i < nfts.length; i++) {
      const tokenURI = await contract.tokenURI(nfts[i]);
      const response = await fetch(
        `${textBaseURI}${tokenURI.split('ipfs://')[1].split('/')[0]}`,
      );
      const result = await response.text();
      test.push(result);
    }
    setLoading(false);
    setWords(test);
  };

  useEffect(() => {
    getNftData();
  }, [walletAddress]);

  const handleMint = async () => {
    if (!window || !window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    alert('Minting...');
  };

  useEffect(() => {
    imageRef.current.src = image;
  }, [image]);

  return (
    <div>
      <Head>
        <title>Dapp Final Project</title>
        <meta name="description" content="Dapp Final Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar connectWallet={connectWallet} />
        <Title>Select Your Text</Title>
        <TextField>{formatSentence(selected)}</TextField>
        <TogglesContainer>
          <ToggleButtonGroup value={selected} onChange={updateSelected}>
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
            variant="contained"
            onClick={getImage}
            disabled={!selected.length}>
            Generate
          </Button>
          <Button
            variant="contained"
            onClick={handleMint}
            disabled={!image.length}>
            Mint
          </Button>
        </ButtonContainer>

        <ImageContainer>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <img ref={imageRef} src={image}></img>
          )}
        </ImageContainer>
      </main>
      {/* 
      <Footer>
        <div>Decentralized Applications Design and Practice 2022 @NTU</div>
      </Footer> */}
    </div>
  );
}
