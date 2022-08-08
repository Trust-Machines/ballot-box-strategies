import * as sip10GetBalance from './sip-10-get-balance';
import {NETWORK, STRATEGY} from './types';
import {NETWORKS} from './constants';

const strategies: Record<string, STRATEGY> = {
    'sip-010-get-balance': sip10GetBalance
}

export const runStrategy = (strategy: string, network: NETWORK, address: string, blockTip: string, options: any) => {
    if (!strategies[strategy]) {
        throw new Error('Unknown strategy!');
    }

    return strategies[strategy].strategy(NETWORKS[network], address, blockTip, options);
}

export default strategies;
