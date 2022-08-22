import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';

import { getProviderOrSigner } from '@/utils';
import { getContract } from '@/utils/contractHelpers';
import useActiveWeb3React from './useActiveWeb3React';
import ERC20_ABI from '@/config/abi/erc20.json';
import { Erc20 } from '@/config/abi/types';

export const useContract = <T extends Contract = Contract>(
  address: string,
  ABI: any,
  withSignerIfPossible = true,
): T | null => {
  const { library, account } = useActiveWeb3React();

  const signerOrProvider = useMemo(() => {
    if (withSignerIfPossible) {
      return library && account ? getProviderOrSigner(library, account) : null;
    }
    return library;
  }, [withSignerIfPossible, library, account]);

  const canReturnContract = useMemo(() => {
    return address && ABI && (withSignerIfPossible ? library : true);
  }, [address, ABI, library, withSignerIfPossible]);

  return useMemo(() => {
    if (!canReturnContract || !signerOrProvider || !address) return null;

    try {
      return getContract(ABI, address, signerOrProvider);
    } catch (error) {
      console.error('>>> Failed to get contract', error);

      return null;
    }
  }, [address, ABI, signerOrProvider, canReturnContract]) as T;
};

export function useTokenContract(
  tokenAddress: string,
  withSignerIfPossible?: boolean,
) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
