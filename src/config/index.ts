import { ChainId } from './constants/chainInfo';

export const EXPLORER_URLS: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com',
};
