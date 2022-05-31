import { formatSentence } from './helpers';

const connectWallet = async () => {
  if (!window || !window.ethereum) {
    alert('Please install MetaMask');
    return;
  }
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    alert(error.message);
  }
};

const createArt = async (selected, callback) => {
  const url = `${process.env.BACKEND_BASE_URL}/text2img/${formatSentence(
    selected,
  )}?sr=2`;
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      let objectURL = URL.createObjectURL(blob);
      callback(objectURL);
    })
    .catch((err) => console.error(err));
};

export { connectWallet, createArt };
