import { useEffect, useState, useRef } from 'react';
import { Web3Provider } from '@ethersproject/providers';

// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { useWeb3React } from '@web3-react/core';

import { CHAIN_ID } from '@/config/constants/networks';

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library);
      refEth.current = library;
    }
  }, [library]);

  return {
    library: provider,
    chainId: chainId ?? parseInt(CHAIN_ID, 10),
    ...web3React,
  };
};

export default useActiveWeb3React;
