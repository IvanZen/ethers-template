import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  define: {
    DEFAULT_CHAIN_ID: '56',
    RPC_NODE_1: 'https://bsc-dataseed1.ninicoin.io',
    RPC_NODE_2: 'https://bsc-dataseed1.ninicoin.io',
    RPC_NODE_3: 'https://bsc-dataseed1.ninicoin.io',
  },
});
