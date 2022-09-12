require('dotenv').config();

import {NETWORK} from './types';
import {StacksMainnet, StacksTestnet} from '@stacks/network';
import {StacksNetwork} from '@stacks/network';
import {HIRO_MAINNET_DEFAULT, HIRO_TESTNET_DEFAULT} from '@stacks/network';

export const NETWORKS: Record<NETWORK, StacksNetwork> = {
    mainnet: new StacksMainnet({url: process.env.BB_MAINNET_URL || HIRO_MAINNET_DEFAULT}),
    testnet: new StacksTestnet({url: process.env.BB_TESTNET_URL || HIRO_TESTNET_DEFAULT})
}
