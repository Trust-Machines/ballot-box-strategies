import strategies, {runStrategy} from '../index';
import {getNetworkByName} from './helper';
import {testConfig} from '../stx-balance';

describe('Strategy test', () => {
    it('Tests', async () => {
        for (let s of Object.keys(strategies)) {
            const strategy = strategies[s];
            const {testConfig} = strategy;

            for (let address of testConfig.addresses) {
                const resp = await runStrategy(s, getNetworkByName(testConfig.network), address, testConfig.blockTip, testConfig.options);
                expect(resp).toMatchSnapshot(`${s}-${address}`);
            }
        }
    });
});
