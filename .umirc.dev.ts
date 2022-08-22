import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    DEFAULT_CHAIN_ID: '97',
    RPC_NODE_1: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    RPC_NODE_2: 'https://data-seed-prebsc-2-s1.binance.org:8545',
    RPC_NODE_3: 'https://data-seed-prebsc-1-s3.binance.org:8545',
  },
});
