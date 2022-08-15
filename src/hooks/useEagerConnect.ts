import { connectorLocalStorageKey, ConnectorNames } from '@/utils/connector';
import { injectedConnector } from '@/utils/web3React';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import useAuth from './useAuth';

const _ethereumListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'ethereum', {
      get() {
        return this._eth;
      },
      set(_eth) {
        this._eth = _eth;

        resolve();
      },
    }),
  );

const safeGetLocalStorageItem = () => {
  try {
    return (
      typeof window?.localStorage?.getItem === 'function' &&
      (window?.localStorage?.getItem(
        connectorLocalStorageKey,
      ) as ConnectorNames)
    );
  } catch (err: any) {
    // Ignore Local Storage Browser error
    // - NS_ERROR_FILE_CORRUPTED
    // - QuotaExceededError
    console.error(`Local Storage error: ${err?.message}`);

    return null;
  }
};

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const tryLogin = (c: ConnectorNames) => {
      setTimeout(() => login(c));
    };

    const connectorId = safeGetLocalStorageItem();

    console.log('connectorId: ', connectorId);

    if (connectorId) {
      // Prevent eager connect on mobile & coinbase wallet not injected, as it keeps trying deeplink to app store.
      if (isMobile) {
        return;
      }

      if (connectorId === ConnectorNames.Injected) {
        const isEthereumDefined = Reflect.has(window, 'ethereum');

        // handle opera lazy inject ethereum
        if (!isEthereumDefined) {
          _ethereumListener().then(() => tryLogin(connectorId));

          return;
        }
        // somehow injected login not working well on development mode
        injectedConnector.isAuthorized().then(() => {
          tryLogin(connectorId);
        });
      } else {
        tryLogin(connectorId);
      }
    } else {
      // Dapp browse will try login even is not authorized.
      injectedConnector.isAuthorized().then(() => {
        if (isMobile && window.ethereum) {
          tryLogin(ConnectorNames.Injected);
        }
      });
    }
  }, [login]);
};

export default useEagerConnect;
