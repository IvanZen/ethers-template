import { useCallback, useEffect } from 'react';
import { parseUnits } from '@ethersproject/units';

import { useTokenContract } from '@/hooks/useContract';
import { getLinkTokenAddress } from '@/utils/addressHelpers';
import { useCatchTxError } from '@/hooks/useCatchTxError';
import { useWeb3React } from '@web3-react/core';

const useSendErc20Token = () => {
  const contract = useTokenContract(getLinkTokenAddress());
  const { fetchWithCatchTxError, loading } = useCatchTxError();

  const send = useCallback(
    async (to: string, amount: string) => {
      if (!contract) {
        return;
      }

      const receipt = await fetchWithCatchTxError(() => {
        return contract.transfer(to, parseUnits(amount, 18));
      });

      return receipt;
    },
    [contract],
  );

  return { sendErc20Token: send, loading };
};

function ContractInteraction() {
  const { active } = useWeb3React();

  const { sendErc20Token, loading } = useSendErc20Token();

  useEffect(() => {
    console.log('Is running ? ', loading);
  }, [loading]);

  return (
    <div>
      <h2>Contract Interaction</h2>
      <button
        disabled={!active}
        onClick={() => {
          sendErc20Token('0x6ccaFDd45956853732Ec1604dA857ca99Ef73838', '0.001');
        }}
      >
        {active ? 'Send ERC20 token' : 'Need to connect'}
      </button>
    </div>
  );
}

export default ContractInteraction;
