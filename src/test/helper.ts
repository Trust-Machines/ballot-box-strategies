import {StacksMainnet, StacksTestnet} from '@stacks/network';
import {NETWORK} from '../types';

export const getNetworkByName = (name: NETWORK) => {
    switch (name) {
        case 'mainnet':
            return new StacksMainnet();
        case 'testnet':
            return new StacksTestnet();
        default:
            throw new Error('Unknown network!');
    }
}
