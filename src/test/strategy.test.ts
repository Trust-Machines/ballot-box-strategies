import {runStrategy} from '../index';
import {StacksMainnet} from '@stacks/network';

describe('Strategy test', () => {
    const network = new StacksMainnet();

    it('sip-010-get-balance', async () => {
        const res = await runStrategy('sip-010-get-balance', network, 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'latest', {
            symbol: 'USDA',
            address: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token',
            decimals: 6
        });

        expect(typeof res).toEqual('number');
    })
});
