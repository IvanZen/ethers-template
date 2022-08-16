import { formatUnits } from '@ethersproject/units';

import { useTokenBalance } from '@/hooks/useTokenBalance';
import { useEffect } from 'react';
import { getLinkTokenAddress } from '@/utils/addressHelpers';

const LinkContractAddressTest = '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06';

const Contract: React.FC = () => {
  const { balance: swrBalance, fetchStatus } = useTokenBalance(
    getLinkTokenAddress(),
  );

  useEffect(() => {
    console.log('fetchStatus: ', fetchStatus);
  }, [fetchStatus]);

  return (
    <div>
      <h1>Contract Interaction</h1>
      <h2>Call contract method in SWR pattern</h2>
      <h3>fetchStatus: {fetchStatus} </h3>
      <h3>Balance: {formatUnits(swrBalance.toString(), 18)}</h3>
    </div>
  );
};

export default Contract;
