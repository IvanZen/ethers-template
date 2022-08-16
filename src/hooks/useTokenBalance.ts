import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';

import { FAST_INTERVAL, SLOW_INTERVAL } from '@/config/constants';
import { BIG_ZERO } from '@/utils/bigNumber';
import { useTokenContract } from './useContract';
import { useSWRContract } from './useSWRContract';

export const useTokenBalance = (tokenAddress: string) => {
  const { account } = useWeb3React();

  const contract = useTokenContract(tokenAddress, false);

  const { data, status, ...rest } = useSWRContract(
    account
      ? {
          contract,
          methodName: 'balanceOf',
          params: [account],
        }
      : null,
    {
      refreshInterval: FAST_INTERVAL,
    },
  );

  return {
    ...rest,
    fetchStatus: status,
    balance: data ? new BigNumber(data.toString()) : BIG_ZERO,
  };
};
