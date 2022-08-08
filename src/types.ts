import {StacksNetwork} from '@stacks/network';

export type NETWORK = 'mainnet' | 'testnet';

interface SchemaEntryBase {
    title: string,
    example: string,
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

export type Schema = Record<string, SchemaEntryString | SchemaEntryNumber | SchemaEntryContract>;


export interface Strategy {
    name: string,
    schema: Schema,
    strategy: (network: StacksNetwork, address: string, blockTip: string, options: any) => Promise<number>,
    test: TestConfig
}

export interface TestConfig {
    network: NETWORK,
    blockTip: string,
    options: any,
    addresses: string[]
}

export interface ContractCallOptions {
    network: StacksNetwork,
    contract: string,
    method: string,
    blockTip: string,
    sender: string,
    args: any[]
}
