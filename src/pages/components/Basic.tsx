import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import useAuth from '@/hooks/useAuth';
import { signMessage } from '@/utils/web3React';
import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import {
  Config,
  connectorLocalStorageKey,
  connectors,
  walletLocalStorageKey,
} from '@/utils/connector';
import { formatUnits } from '@ethersproject/units';

export default function Basic() {
  const { account, active, chainId } = useWeb3React();
  const { library, connector } = useActiveWeb3React();
  const { login, logout } = useAuth();

  const [connectorName, setConnectorName] = useState<string>();
  const [nativeTokenBalance, setNativeTokenBalance] = useState<string>();

  const handleConnect = async (walletConfig: Config) => {
    await login(walletConfig.connectorId);
    localStorage?.setItem(walletLocalStorageKey, walletConfig.title);
    localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId);
  };

  const handleDisconnect = () => {
    logout();
  };

  const handleSignMessage = async () => {
    if (!connector) {
      return alert('Connector error');
    }

    if (!account) {
      return alert('Not connected');
    }

    const signature = await signMessage(
      connector,
      library,
      account,
      'This is a simple signature',
    );

    alert(`Signature: ${signature}`);
  };

  useEffect(() => {
    if (!active) {
      return setConnectorName('null');
    }

    setConnectorName(localStorage?.getItem(connectorLocalStorageKey) || 'null');
  }, [connector, active]);

  useEffect(() => {
    if (!account) {
      return setNativeTokenBalance('null');
    }

    library?.getBalance(account).then((value) => {
      setNativeTokenBalance(formatUnits(value.toString(), 18));
    });
  }, [account, library]);

  return (
    <div>
      <h2>Basic usage</h2>
      <ul>
        <h3>Active: {String(active)}</h3>
        <h3>Account: {account}</h3>
        <h3>Chain ID: {chainId}</h3>
        <h3>Connector: {connectorName}</h3>
        <h3>Native token balance: {nativeTokenBalance}</h3>
      </ul>

      <div style={{ display: 'flex', columnGap: '8px' }}>
        {connectors.map((connector) => (
          <button
            key={connector.connectorId}
            onClick={async () => {
              await handleConnect(connector);
            }}
          >
            Connect {connector.title}
          </button>
        ))}

        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={handleSignMessage}>Sign</button>
      </div>
    </div>
  );
}
