import sample from 'lodash/sample';

if (
  process.env.NODE_ENV !== 'production' &&
  (!RPC_NODE_1 || !RPC_NODE_2 || !RPC_NODE_3)
) {
  throw Error('One base RPC URL is undefined');
}

// Array of available nodes to connect to
export const nodes = [RPC_NODE_1, RPC_NODE_2, RPC_NODE_3];

const getNodeUrl = () => {
  return sample(nodes);
};

export default getNodeUrl;
