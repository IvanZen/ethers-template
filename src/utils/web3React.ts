import { InjectedConnector } from '@web3-react/injected-connector';
import { CloverConnector } from '@clover-network/clover-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

import { CHAIN_ID } from '@/config/constants/networks';
import { Web3Provider } from '@ethersproject/providers';
import { ConnectorNames } from './connector';

const POLLING_INTERVAL = 12000;
const chainId = parseInt(CHAIN_ID, 10);

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [chainId],
});

const cloverConnector = new CloverConnector({ supportedChainIds: [chainId] });

export const connectorsByName: Record<ConnectorNames, any> = {
  [ConnectorNames.Injected]: injectedConnector,
  [ConnectorNames.Clover]: cloverConnector,
};

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string,
): Promise<string> => {
  return provider.getSigner(account).signMessage(message);
};
