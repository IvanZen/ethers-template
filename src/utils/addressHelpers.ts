import { ChainId } from '@/config/constants/chainInfo';
import { Address } from '@/config/constants/types';
import addresses from '@/config/constants/contractAddresses';

// TODO: ts opmization
export const getAddress = (address: Address): string => {
  if (!Object.keys(address).includes(DEFAULT_CHAIN_ID)) {
    return address[ChainId.MAINNET];
  }

  const chainId = DEFAULT_CHAIN_ID as unknown as ChainId;

  return address[chainId] ? address[chainId] : address[ChainId.MAINNET];
};

export const getLinkTokenAddress = () => {
  return getAddress(addresses.linkToken);
};
