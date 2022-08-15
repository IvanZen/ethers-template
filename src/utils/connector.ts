export enum ConnectorNames {
  Injected = 'injected',
  Clover = 'clover',
}

export interface Config {
  title: string;
  connectorId: ConnectorNames;
}

export const connectors: Config[] = [
  {
    title: 'Metamask',
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'Clover',
    connectorId: ConnectorNames.Clover,
  },
];

export const connectorLocalStorageKey = 'connectorId';
export const walletLocalStorageKey = 'wallet';
