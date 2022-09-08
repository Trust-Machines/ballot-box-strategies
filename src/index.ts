import {StacksNetwork} from '@stacks/network';
import {Strategy, StrategyOptions} from './types';

import * as sip10GetBalance from './sip-010-get-balance';
import * as stxBalance from './stx-balance';

export * from './types';

const strategies: Record<string, Strategy> = {
    'sip-010-get-balance': sip10GetBalance,
    'stx-balance': stxBalance
}

export const runStrategy = (strategy: string, network: StacksNetwork, address: string, blockTip: string, options: StrategyOptions) => {
    if (!strategies[strategy]) {
        throw new Error('Unknown strategy!');
    }

    if (!blockTip.trim()) {
        throw new Error('Invalid blockTip!');
    }

    // remove 0x in the beginning
    const tip = blockTip.replace('0x', '');

    return strategies[strategy].strategy(network, address, tip, options);
}

export default strategies;
