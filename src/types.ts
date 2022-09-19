import {StacksNetwork} from '@stacks/network';

export type NETWORK = 'mainnet' | 'testnet';

interface SchemaEntryBase {
    title: string,
    example: string,
    help?: string
}

export interface SchemaEntryString extends SchemaEntryBase {
    type: 'string',
    minLength: number,
    maxLength: number
}

export interface SchemaEntryNumber extends SchemaEntryBase {
    type: 'number',
    min: number,
    max: number,
}

export interface SchemaEntryContract extends SchemaEntryBase {
    type: 'contract',
}

export interface SchemaEntryHardcoded extends Omit<SchemaEntryBase, 'example'> {
    type: 'hardcoded',
    value: any
}

export type Schema = Record<string, SchemaEntryString | SchemaEntryNumber | SchemaEntryContract | SchemaEntryHardcoded>;

export interface TestConfig {
    network: NETWORK,
    blockTip: string,
    blockHeight: number,
    options: StrategyOptions,
    addresses: string[]
}

export interface StrategyOptions {
    symbol: string,

    [key: string]: any
}

export interface StrategyArgs {
    network: StacksNetwork,
    address: string,
    blockTip: string,
    blockHeight: number,
    options: StrategyOptions
}

export interface StrategyBaseOptions {
    noDecimalFormat?: boolean
}

export interface Strategy {
    description: string,
    schema: Schema,
    strategy: (args: StrategyArgs) => Promise<number>,
    baseOptions?: StrategyBaseOptions,
    testConfig: TestConfig
}

export interface ContractCallOptions {
    network: StacksNetwork,
    contract: string,
    method: string,
    blockTip: string,
    sender: string,
    args: any[]
}
