import { useCallback, useState } from 'react';
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

export type TxResponse = TransactionResponse | null;

export type CatchTxErrorReturn = {
  fetchWithCatchTxError: (
    fn: () => Promise<TxResponse>,
  ) => Promise<TransactionReceipt | null>;
  loading: boolean;
};

type ErrorData = {
  code: number;
  message: string;
};

type TxError = {
  data: ErrorData;
  error: string;
};

export const isUserRejected = (err: any) => {
  // provider user rejected error code
  return typeof err === 'object' && 'code' in err && err.code === 4001;
};

// -32000 is insufficient funds for gas * price + value
export const isInsufficientGasError = (err: TxError): boolean =>
  err?.data?.code === -32000;

// TODO:  migrate to useRequest
export const useCatchTxError = (): CatchTxErrorReturn => {
  const { library } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const handleNormalError = useCallback((error, tx?: TxResponse) => {
    console.error('handleNormalError >>> tx error: ', error);

    if (tx) {
      alert(`error in tx: ${tx.hash}`);
    } else {
      alert('tx errror');
    }
  }, []);

  const fetchWithCatchTxError = useCallback(
    async (
      callTx: () => Promise<TxResponse>,
    ): Promise<TransactionReceipt | null> => {
      let tx: TxResponse = null;

      try {
        setLoading(true);

        /**
         * https://github.com/vercel/swr/pull/1450
         *
         * wait for useSWRMutation finished, so we could apply SWR in case manually trigger tx call
         */
        tx = await callTx();

        alert('Transaction Submitted!');

        const receipt = await tx?.wait();

        console.log('>>> receipt: ', receipt);

        return receipt ?? null;
      } catch (error) {
        if (!isUserRejected(error)) {
          if (!tx) {
            handleNormalError(error);
          } else {
            // TODO: figure out the purpose of library.call, may be trying to find out whether
            // the errror was caused by network fluctuation or some robabilistic reason.
            library
              .call(tx, tx.blockNumber)
              .then(() => {
                handleNormalError(error, tx);
              })
              .catch((err: any) => {
                if (isInsufficientGasError(err)) {
                  handleNormalError(error, tx);
                } else {
                  console.error(error);

                  let recursiveErr = err;

                  let reason: string | undefined;

                  // for MetaMask
                  if (recursiveErr?.data?.message) {
                    reason = recursiveErr?.data?.message;
                  } else {
                    // for other wallets
                    // Reference
                    // https://github.com/Uniswap/interface/blob/ac962fb00d457bc2c4f59432d7d6d7741443dfea/src/hooks/useSwapCallback.tsx#L216-L222
                    while (recursiveErr) {
                      reason =
                        recursiveErr.reason ?? recursiveErr.message ?? reason;
                      recursiveErr =
                        recursiveErr.error ?? recursiveErr.data?.originalError;
                    }
                  }
                }
              });
          }
        } else {
          alert('User denied transaction signature.');
        }
      } finally {
        setLoading(false);
      }

      return null;
    },
    [handleNormalError, library],
  );

  return {
    fetchWithCatchTxError,
    loading,
  };
};
