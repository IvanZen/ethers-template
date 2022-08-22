import Basic from './components/Basic';
import ContractInteraction from './components/ContractInteraction';
import SwrContract from './components/swrContract';

export default function IndexPage() {
  return (
    <div>
      <h1>Ethers Template</h1>
      <hr />
      <Basic />
      <hr />
      <SwrContract />
      <hr />
      <ContractInteraction />
    </div>
  );
}
