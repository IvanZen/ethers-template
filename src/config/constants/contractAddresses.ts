import { ChainId } from './chainInfo';

type ContractName = 'linkToken';

const contracts: Record<ContractName, Record<ChainId, string>> = {
  linkToken: {
    [ChainId.MAINNET]: '',
    [ChainId.TESTNET]: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
  },
};

export default contracts;
