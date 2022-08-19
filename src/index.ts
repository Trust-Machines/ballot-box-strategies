import {StacksNetwork} from '@stacks/network';
import * as sip10GetBalance from './sip-010-get-balance';
import * as stxBalance from './stx-balance';
import {Strategy, StrategyOptions} from './types';
export * from './types';

const strategies: Record<string, Strategy> = {
    'sip-010-get-balance': sip10GetBalance,
    'stx-balance': stxBalance
}

export const runStrategy = (strategy: string, network: StacksNetwork, address: string, blockTip: string, options: StrategyOptions) => {
    if (!strategies[strategy]) {
        throw new Error('Unknown strategy!');
    }

    return strategies[strategy].strategy(network, address, blockTip, options);
}

export default strategies;
