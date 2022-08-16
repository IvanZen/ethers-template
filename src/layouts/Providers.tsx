import { Web3ReactProvider } from '@web3-react/core';
import { SWRConfig } from 'swr';

import { getLibrary } from '@/utils/web3React';
import { fetchStatusMiddleware } from '@/hooks/useSWRContract';

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <SWRConfig
        value={{
          use: [fetchStatusMiddleware],
        }}
      >
        {children}
      </SWRConfig>
    </Web3ReactProvider>
  );
};

export default Providers;
