import { useEffect } from 'react';
import { formatUnits } from '@ethersproject/units';

import { useTokenBalance } from '@/hooks/useTokenBalance';
import { getLinkTokenAddress } from '@/utils/addressHelpers';

const Contract: React.FC = () => {
  const { balance: swrBalance, fetchStatus } = useTokenBalance(
    getLinkTokenAddress(),
  );

  useEffect(() => {
    console.log('fetchStatus: ', fetchStatus);
  }, [fetchStatus]);

  return (
    <div>
      <h2>Call contract method in SWR pattern</h2>
      <h3>fetchStatus: {fetchStatus} </h3>
      <h3>Balance: {formatUnits(swrBalance.toString(), 18)}</h3>
    </div>
  );
};

export default Contract;
