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

export { connectWallet };
