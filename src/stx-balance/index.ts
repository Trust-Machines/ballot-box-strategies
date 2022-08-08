import {StacksNetwork} from '@stacks/network';
import BigNumber from 'bignumber.js';
import {getAccountBalance} from '../api';
import {Schema, TestConfig} from '../types';

export const name = 'stx-balance';

export const schema: Schema = {}

export const test: TestConfig = {
    network: 'mainnet',
    blockTip: '0xbdd1aeeb13dde4ee791be3a8221549b75e248aedbc8df467fee5d84322f3dbf8',
    options: {},
    addresses: [
        'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
        'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN',
        'SP2N7SK0W83NJSZHFH8HH31ZT3DXJG7NFE5VYT9SJ',
        'SP2VWSP59FEVDXXYGGWYG90M3N67ZST2AGQK6Q5RY'
    ]
}

export async function strategy(network: StacksNetwork, address: string, blockTip: string): Promise<number> {
    const balance = await getAccountBalance(network, address, blockTip);
    const bn = new BigNumber(balance).dividedBy(10 ** 6).toFixed(4, BigNumber.ROUND_FLOOR);
    return parseFloat(bn.toString());
}
