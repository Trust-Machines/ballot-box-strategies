import {StacksMainnet, StacksTestnet} from '@stacks/network';
import {NETWORK} from './types';
import strategies, {runStrategy} from './index';

export const getNetworkByName = (name: NETWORK) => {
    switch (name) {
        case 'mainnet':
            return new StacksMainnet();
        case 'testnet':
            return new StacksTestnet();
        default:
            throw new Error('Unknown network!');
    }
}

export const testStrategy = async (s: string) => {
    const strategy = strategies[s];
    const {testConfig} = strategy;

    for (let address of testConfig.addresses) {
        const resp = await runStrategy(s, getNetworkByName(testConfig.network), address, testConfig.blockTip, testConfig.options);
        expect(resp).toMatchSnapshot(`${s}-${address}`);
    }
}
