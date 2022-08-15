import { useCallback } from 'react';

import { message } from 'antd';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';

import { connectorsByName } from '@/utils/web3React';
import { setupNetwork } from '@/utils/wallet';
import { connectorLocalStorageKey, ConnectorNames } from '@/utils/connector';

const useAuth = () => {
  const { chainId, activate, deactivate, setError } = useWeb3React();

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const connectorOrGetConnector = connectorsByName[connectorID];

      console.log('>>> connectorOrGetConnector:', connectorOrGetConnector);

      const connector =
        typeof connectorOrGetConnector !== 'function'
          ? connectorsByName[connectorID]
          : await connectorOrGetConnector();

      if (typeof connector !== 'function' && connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error);

            const provider = await connector.getProvider();
            const hasSetup = await setupNetwork(provider);

            if (hasSetup) {
              activate(connector);
            }
          } else {
            window?.localStorage?.removeItem(connectorLocalStorageKey);
            if (
              error instanceof
              NoEthereumProviderError /*  || error instanceof NoBscProviderError */
            ) {
              message.error('Provider Error');
            }
          }
        });
      } else {
        window?.localStorage?.removeItem(connectorLocalStorageKey);
        message.error(
          'Unable to find connector. The connector config is wrong',
        );
      }
    },
    [activate, setError],
  );

  const logout = useCallback(() => {
    deactivate();
    // TODO: clear global user states
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
