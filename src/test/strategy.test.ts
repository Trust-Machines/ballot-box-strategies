import strategies, {runStrategy} from '../index';
import {getNetworkByName} from './helper';

describe('Strategy test', () => {
    it('Tests', async () => {
        for (let s of Object.keys(strategies)) {
            const strategy = strategies[s];
            const {test} = strategy;

            for (let address of test.addresses) {
                const resp = await runStrategy(s, getNetworkByName(test.network), address, test.blockTip, test.options);
                expect(resp).toMatchSnapshot(`${s}-${address}`);
            }
        }
    });
});
