import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import styled from '@emotion/styled';
import Tilt from 'react-parallax-tilt';
import PropTypes from 'prop-types';
import { Button } from '.';
import MyNFT from '../artifacts/contracts/nft.sol/MyToken.json';
import { CONTRACT_ADDRESS } from '../utils';

const Card = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.15);
  > div,
  img {
    z-index: 2;
  }
  ${(props) =>
    props.blur &&
    `
  overflow: hidden;
  `}
  &:before {
    ${(props) =>
      props.blur &&
      `
    content: '';
    background: url(${props.blur}) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
    filter: blur(96px);
    -webkit-filter: blur(96px);
    `}
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 20px;
    margin-right: 5px;
    margin-left: -5px;
  }
`;

const Title = styled.h5`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.5rem;
  color: #c5c5c5;
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
`;

function NFTCard({ tokenId }) {
  const gifURI = `/gif/${tokenId}.gif`;
  const mp4Uri = `/mp4/${tokenId}.mp4`;
  const metadataURI = `/metadata/${tokenId}.json`;

  const [contract, setContract] = useState();
  const [isMinted, setIsMinted] = useState(false);
  const [metadata, setMetadata] = useState({});

  const videoRef = useRef();

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
    const contract = new ethers.Contract(CONTRACT_ADDRESS, MyNFT.abi, signer);
    setContract(contract);
    const result = await contract.isContentOwned(metadataURI);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const walletAddr = accounts[0];
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [walletAddr, 'latest'],
    });
    const { price } = metadata;
    if (balance.result < price) {
      alert(`You need to have at least ${price} ETH in your wallet`);
      return;
    }
    // TODO: should also check price in the contract
    const result = await contract.payToMint(walletAddr, metadataURI, {
      value: ethers.utils.parseEther(price.toString()),
    });

    await result.wait();
    getMintedStatus();
  };

  const getURI = async () => {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  };

  const playVideo = () => {
    videoRef.current.play();
  };
  const pauseVideo = () => {
    videoRef.current.pause();
  };

  return (
    <Tilt tiltEnable={false} scale={1.03}>
      <Card blur={gifURI}>
        {/* <img
          src={gifURI}
          alt="gif"
          style={{ borderRadius: '8px', height: '150px' }}
        /> */}
        <video
          ref={videoRef}
          loop
          style={{ borderRadius: '8px', height: '150px', zIndex: '2' }}
          src={mp4Uri}
          onMouseOver={playVideo}
          onMouseOut={pauseVideo}></video>
        <Description>
          <div>
            <Title>{`#${tokenId}`}</Title>
            <Content>{metadata.name}</Content>
          </div>
          <div>
            <Title>Price</Title>
            <Content>
              <Price>
                <img src="/img/eth.png" />
                {metadata.price?.toFixed(2)}
              </Price>
            </Content>
          </div>
        </Description>
        <ButtonsContainer>
          {isMinted ? (
            <Button disabled padding="7px 22px" variant="semiTransparent">
              Sold
            </Button>
          ) : (
            <Button
              onClick={mintToken}
              glowOnHover
              padding="7px 22px"
              variant="semiTransparent">
              Mint
            </Button>
          )}
          <Button
            onClick={getURI}
            glowOnHover
            padding="7px 22px"
            variant="semiTransparent">
            View
          </Button>
        </ButtonsContainer>
      </Card>
    </Tilt>
  );
}

NFTCard.propTypes = {
  tokenId: PropTypes.number.isRequired,
};

export default NFTCard;
