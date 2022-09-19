import {Strategy, StrategyArgs} from './types';

import * as sip009Balance from './sip-009-balance';
import * as sip10GetBalance from './sip-010-get-balance';
import * as stxBalance from './stx-balance';

export * from './types';

const strategies: Record<string, Strategy> = {
    'stx-balance': stxBalance,
    'sip-009-balance': sip009Balance,
    'sip-010-get-balance': sip10GetBalance
}

export const runStrategy = (strategy: string, args: StrategyArgs) => {
    if (!strategies[strategy]) {
        throw new Error('Unknown strategy!');
    }

    return strategies[strategy].strategy({
        ...args,
        // remove 0x in the beginning
        blockTip: args.blockTip.replace('0x', '')
    });
}

export default strategies;
