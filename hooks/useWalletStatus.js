import { useState, useEffect } from 'react';
import { connectWallet } from '../utils';

const useWalletStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    connectWallet()
      .then(() => setIsConnected(true))
      .catch((err) => alert(err));
  }, []);

  return [connectWallet, isConnected];
};

export { useWalletStatus };
