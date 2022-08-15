import { IRouteComponentProps } from 'umi';

import Providers from '@/layouts/Providers';
import useEagerConnect from '@/hooks/useEagerConnect';

const GlobalHooks = () => {
  useEagerConnect();
  return null;
};

const Layout = ({ children }: IRouteComponentProps) => {
  return (
    <Providers>
      <GlobalHooks />
      {children}
    </Providers>
  );
};

export default Layout;
