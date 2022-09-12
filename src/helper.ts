import {NETWORK} from './types';
import {NETWORKS} from './constants';
import strategies, {runStrategy} from './index';

export const getNetworkByName = (name: NETWORK) => {
    return NETWORKS[name];
}

export const testStrategy = async (s: string) => {
    const strategy = strategies[s];
    const {testConfig} = strategy;

    // Symbol definition must be exists in the schema
    expect(strategy.schema.symbol === undefined).toEqual(false);

    for (let address of testConfig.addresses) {
        const resp = await runStrategy(s, {
            network: getNetworkByName(testConfig.network),
            address,
            blockTip: testConfig.blockTip,
            blockHeight: testConfig.blockHeight,
            options: testConfig.options
        });
        expect(resp).toMatchSnapshot(`${s}-${address}`);
    }
}
