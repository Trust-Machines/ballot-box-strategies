import BigNumber from 'bignumber.js';
import {getAccountBalance} from '../api';
import {Schema, StrategyArgs, TestConfig} from '../types';

export const description = 'Stacks token balance';

export const schema: Schema = {
    symbol: {
        title: 'Symbol',
        type: 'hardcoded',
        value: 'STX'
    },
}

export const testConfig: TestConfig = {
    network: 'mainnet',
    blockTip: '0x693fabed45cb877fa05e5dadb5eb758433a1d653953470072934944284bac408',
    blockHeight: 0,
    options: {
        symbol: 'STX'
    },
    addresses: [
        'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
        'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN',
        'SP2N7SK0W83NJSZHFH8HH31ZT3DXJG7NFE5VYT9SJ',
        'SP2VWSP59FEVDXXYGGWYG90M3N67ZST2AGQK6Q5RY'
    ]
}

export async function strategy(args: StrategyArgs): Promise<number> {
    const {network, address, blockTip} = args;
    const balance = await getAccountBalance(network, address, blockTip);
    const bn = new BigNumber(balance).dividedBy(10 ** 6).toFixed(4, BigNumber.ROUND_FLOOR);
    return parseFloat(bn.toString());
}
