import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

export const getSigner = (
  library: Web3Provider,
  account?: string,
): JsonRpcSigner => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner => {
  return account ? getSigner(library, account) : library;
};
