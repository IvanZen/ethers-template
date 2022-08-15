import { ExternalProvider } from '@ethersproject/providers';

import { EXPLORER_URLS } from '@/config';
import { ChainId } from '@/config/constants/chainInfo';

const NETWORK_CONFIG = {
  [ChainId.MAINNET]: {
    name: 'BNB Smart Chain Mainnet',
    scanURL: EXPLORER_URLS[ChainId.MAINNET],
  },
  [ChainId.TESTNET]: {
    name: 'BNB Smart Chain Testnet',
    scanURL: EXPLORER_URLS[ChainId.TESTNET],
  },
};

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = externalProvider || window.ethereum;

  /** default chain ID */
  const chainId = parseInt(DEFAULT_CHAIN_ID, 10) as keyof typeof NETWORK_CONFIG;

  // 如果取不到默认链的配置，则控制台打印错误
  if (!NETWORK_CONFIG[chainId]) {
    console.error('Invalid chain id');
    return false;
  }

  if (provider) {
    try {
      await provider?.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError) {
      if ((switchError as any)?.code === 4902) {
        try {
          await provider?.request?.({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: NETWORK_CONFIG[chainId].name,
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'bnb',
                  decimals: 18,
                },
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
                blockExplorerUrls: [`${NETWORK_CONFIG[chainId].scanURL}/`],
              },
            ],
          });
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error);
          return false;
        }
      }
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined",
    );
    return false;
  }
};
