import { useState, useEffect } from 'react';
import MyNFT from '../artifacts/contracts/nft.sol/MyToken.json';
import { ethers } from 'ethers';
import styled from '@emotion/styled';
import {
  // Button,
  // Card,
  // CardActions,
  // CardContent,
  // CardMedia,
  Typography,
} from '@mui/material';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const folder = 'QmXMZP947EdcmxDLDnzEmCT6j9GfV7NphCmmmZQMuBwE6x';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.15);
  > div, img {
    z-index: 2;
  }
  ${props => props.blur && `
  overflow: hidden;
  `}
  &:before {
    ${props => props.blur && `
    content: '';
    background: url(${props.blur}) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
    filter: blur(96px);
    -webkit-filter: blur(96px);
    ` }
  }
  
`;

const Button = styled.button`
  font-family: sans-serif;
  color: #fff;
  font-size: 18px;
  // padding: 12px 32px; // TODO: make this dynamic
  padding: 7px 22px;
  // margin: 1rem;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  &:hover {
    ${props => props.glowOnHover && `
    box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 20px 0px;
    transition: all 0.3s ease;`
    }
    ${props => props.outlined && `
    background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
    transition: all 0.3s ease;
    `
  }
  }
  transition: all 0.3s ease;
  ${props => props.outlined ? `
  border: 2px double transparent;
  background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)), radial-gradient(circle at left top, rgb(1, 110, 218), rgb(217, 0, 192));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  ` : `
  background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
  border: 0;
  `}
  `;


  const Description = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;

  `

  const Price = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 20px;
    margin-right: 5px;
  }
  `

const Title = styled.h5`
  font-size: .9rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.5rem;
  color: #808080;
  `;
const Content = styled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.5rem;
  color: #fff;
  `;

  const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 5px;
  button {
    margin-right: 15px;
    margin-left: -5px;
  }
  `


function NFTText({ tokenId, getCount, contentId }) {
  // const metadataURI = `${contentId}/${tokenId}.json`;
  // const textURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;
  // const gifURI = `https://gateway.pinata.cloud/ipfs/${folder}/${tokenId}.gif`
  // const metadataURI = `https://gateway.pinata.cloud/ipfs/QmbexVNZCB1ukmKaJh3zsDDo7Hxh16GzrZ3RMxqqv1FyKZ/${tokenId}.json`;
  const gifURI = `/gif/${tokenId}.gif`;
  const metadataURI = `/metadata/${tokenId}.json`;

  const [contract, setContract] = useState();
  const [signer, setSigner] = useState();
  const [isMinted, setIsMinted] = useState(false);
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  useEffect(() => {
    getMetadata();
  });

  const getMetadata = async () => {
    try {
      const response = await fetch(metadataURI);
      const result = await response.json();
      setMetadata(result);
    } catch (err) {
      console.log(err);
    }
  };

  const getMintedStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);
    const result = await contract.isContentOwned(metadataURI);
    setContract(contract);
    setSigner(signer);
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
    // <Card>
    //   <CardMedia component="img" height="140" image={gifURI} alt="gif" />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {`#${tokenId} - ${metadata.name}`}
    //     </Typography>
    //     <Typography variant="body1" color="text.secondary">
    //       0.05 ETH
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     {!isMinted ? (
    //       <Button size="small" variant="contained" onClick={mintToken}>
    //         Mint
    //       </Button>
    //     ) : (
    //       <Button size="small" variant="contained" onClick={getURI} disabled>
    //         Sold
    //       </Button>
    //     )}
    //     <Button size="small" variant="contained" onClick={() => {}}>
    //       View
    //     </Button>
    //   </CardActions>
    // </Card>
    <Card blur={gifURI}>
      <img src={gifURI} alt="gif" style={{borderRadius: '8px'}} />
      <Description>
        <div>
        <Title>{`#${tokenId}`}</Title>
        <Content>{metadata.name}</Content>
        </div>
        <div>
        <Title>Price</Title>
        <Content><Price><img src="/img/eth.png" />0.05</Price></Content>
        </div>
      </Description>
      <ButtonsContainer>
        <Button onClick={mintToken} glowOnHover>
        Mint
      </Button>
      <Button onClick={getURI} glowOnHover>
        View
      </Button>
      </ButtonsContainer>
    </Card>
  );
}

export default NFTText;
