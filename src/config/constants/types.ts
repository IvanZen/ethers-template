import { ChainId } from './chainInfo';

export type Address = Record<ChainId, string>;

export enum FetchStatus {
  Idle = 'IDLE',
  Fetching = 'FETCHING',
  Fetched = 'FETCHED',
  Failed = 'FAILED',
}
