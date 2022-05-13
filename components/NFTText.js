import { useState, useEffect } from 'react';
import MyNFT from '../artifacts/contracts/nft.sol/MyToken.json';
import { ethers } from 'ethers';
import { Button } from '@mui/material';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function NFTText({ tokenId, getCount, contentId }) {
  const metadataURI = `${contentId}/${tokenId}.json`;
  const textURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;

  const [contract, setContract] = useState();
  const [signer, setSigner] = useState();

  const [text, setText] = useState('');

  const [isMinted, setIsMinted] = useState(false);

  const getText = async () => {
    try {
      const response = await fetch(textURI);
      const result = await response.text();
      setText(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  useEffect(() => {
    getText();
  });

  const getMintedStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);
    const result = await contract.isContentOwned(metadataURI);
    setContract(contract);
    setSigner(signer);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const walletAddr = accounts[0];
    const result = await contract.payToMint(walletAddr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div>
      <h3>{text}</h3>
      {!isMinted ? (
        <Button variant="contained" onClick={mintToken}>
          Mint
        </Button>
      ) : (
        <Button variant="contained" onClick={getURI}>
          Taken! Show URI
        </Button>
      )}
    </div>
  );
}

export default NFTText;
