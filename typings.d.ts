declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  ethereum?: {
    isMetaMask?: true;
    isOpera?: true;
    isCoinbaseWallet?: true;
    isTrust?: true;
    providers?: any[];
    request?: (...args: any[]) => Promise<void>;
  };
  BinanceChain?: {
    bnbSign?: (
      address: string,
      message: string,
    ) => Promise<{ publicKey: string; signature: string }>;
  };
}

declare const DEFAULT_CHAIN_ID: string;
declare const RPC_NODE_1: string;
declare const RPC_NODE_2: string;
declare const RPC_NODE_3: string;
