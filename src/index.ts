import {StacksNetwork} from '@stacks/network';
import * as sip10GetBalance from './sip-010-get-balance';
import {STRATEGY} from './types';

const strategies: Record<string, STRATEGY> = {
    'sip-010-get-balance': sip10GetBalance
}

export const runStrategy = (strategy: string, network: StacksNetwork, address: string, blockTip: string, options: any) => {
    if (!strategies[strategy]) {
        throw new Error('Unknown strategy!');
    }

    return strategies[strategy].strategy(network, address, blockTip, options);
}

export default strategies;
