import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  define: {
    DEFAULT_CHAIN_ID: '56',
  },
});
