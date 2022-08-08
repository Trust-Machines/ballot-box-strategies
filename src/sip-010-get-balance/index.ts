import {StacksNetwork} from '@stacks/network';
import {standardPrincipalCV, cvToHex} from '@stacks/transactions';
import BigNumber from 'bignumber.js';
import {Schema, TestConfig} from '../types';
import {readOnlyContractCall} from '../helper';

export const name = 'sip-010-get-balance';

export const schema: Schema = {
    symbol: {
        type: 'string',
        title: 'Symbol',
        example: 'e.g. USDA',
        minLength: 1,
        maxLength: 10
    },
    address: {
        type: 'contract',
        title: 'Contract address',
        example: 'e.g. SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token'
    },
    decimals: {
        type: 'number',
        title: 'Decimals',
        example: 'e.g. 6',
        min: 0,
        max: 20
    }
}

export const test: TestConfig = {
    network: 'mainnet',
    blockTip: 'string',
    options: {
        symbol: 'USDA',
        address: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token',
        decimals: 6
    },
    addresses: [
        'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
        'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN',
        'SP2N7SK0W83NJSZHFH8HH31ZT3DXJG7NFE5VYT9SJ',
        'SP2VWSP59FEVDXXYGGWYG90M3N67ZST2AGQK6Q5RY'
    ]
}

export async function strategy(network: StacksNetwork, address: string, blockTip: string, options: any): Promise<number> {
    const resp = await readOnlyContractCall({
        network,
        contract: options.address,
        method: 'get-balance',
        blockTip,
        sender: address,
        args: [
            cvToHex(standardPrincipalCV(address))
        ]
    });
    const bn = new BigNumber(resp.value.value).dividedBy(10 ** options.decimals).toFixed(4, BigNumber.ROUND_FLOOR);
    return parseFloat(bn.toString());
}
