import {getAccountBalances} from '../api';
import {Schema, StrategyArgs, TestConfig} from '../types';

export const description = 'SIP-009 NFT balance';

export const strategyBaseOptions = {
    noDecimalFormat: true
}

export const schema: Schema = {
    symbol: {
        type: 'string',
        title: 'Symbol',
        example: 'e.g. APE',
        minLength: 1,
        maxLength: 10
    },
    address: {
        type: 'contract',
        title: 'Contract address',
        example: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-ape-club-nft'
    },
    identifier: {
        type: 'string',
        title: 'Token identifier',
        example: 'e.g. megapont-ape-club',
        help: 'Asset name declared in the smart contract next to `define-non-fungible-token` directive.',
        minLength: 1,
        maxLength: 40,
    }
}

export const testConfig: TestConfig = {
    network: 'mainnet',
    blockTip: '',
    blockHeight: 74910,
    options: {
        symbol: 'Mfers',
        address: 'SP2N3BAG4GBF8NHRPH6AY4YYH1SP6NK5TGCY7RDFA.stacks-mfers',
        identifier: 'stacks-mfers'
    },
    addresses: [
        'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
        'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN',
        'SP2N7SK0W83NJSZHFH8HH31ZT3DXJG7NFE5VYT9SJ'
    ]
}

export async function strategy(args: StrategyArgs): Promise<number> {
    const {network, address, blockHeight, options} = args;
    const fullIdentifier = `${options.address}::${options.identifier}`;

    const balances = await getAccountBalances(network, address, blockHeight);

    if (balances.non_fungible_tokens[fullIdentifier]) {
        return Number(balances.non_fungible_tokens[fullIdentifier].count);
    }

    return 0;
}
