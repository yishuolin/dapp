import { useState, useEffect } from 'react';
import MyNFT from '../artifacts/contracts/nft.sol/MyToken.json';
import { ethers } from 'ethers';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmP5mNKa86PUFdjvi4bfHjLdSbB5Tsw918Hc7ooQE5Vp8L';
  const metadataURI = `${contentId}/${tokenId}.json`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;
  const imageURI =
    'https://gateway.pinata.cloud/ipfs/QmP5mNKa86PUFdjvi4bfHjLdSbB5Tsw918Hc7ooQE5Vp8L';

  const [contract, setContract] = useState();
  const [signer, setSigner] = useState();

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // get the smart contract
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
    const result = await contract.payToMint(addr, metadataURI, {
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
      <img src={imageURI} style={{ width: '150px' }}></img>
      <h5>ID #{tokenId}</h5>
      {!isMinted ? (
        <button onClick={mintToken}>Mint</button>
      ) : (
        <button onClick={getURI}>Taken! Show URI</button>
      )}
    </div>
  );
}

export default NFTImage;
