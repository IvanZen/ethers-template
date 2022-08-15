import { IRouteComponentProps } from 'umi';

import Providers from '@/layouts/Providers';

const Layout = ({ children }: IRouteComponentProps) => {
  return <Providers>{children}</Providers>;
};

export default Layout;
