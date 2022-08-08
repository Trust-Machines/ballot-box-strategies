import {StacksMainnet, StacksNetwork, StacksTestnet} from '@stacks/network';
import {NETWORK} from './types';


export const NETWORKS: Record<NETWORK, StacksNetwork> = {
    'mainnet': new StacksMainnet(),
    'testnet': new StacksTestnet()
};
