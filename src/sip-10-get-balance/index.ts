import {StacksNetwork} from '@stacks/network';
import {standardPrincipalCV, cvToHex} from '@stacks/transactions';
import BigNumber from 'bignumber.js';
import {Schema} from '../types';
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
        example: 'e.g. 18',
        min: 0,
        max: 20
    }
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
