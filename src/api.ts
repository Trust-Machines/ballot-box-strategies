import axios from 'axios';
import {StacksNetwork} from '@stacks/network';
import {cvToJSON, cvToValue, hexToCV} from '@stacks/transactions';
import {ContractCallOptions} from './types';

class ContractCallError extends Error {
    cause: string;

    constructor(message: string) {
        super(message);
        this.cause = message;
    }
}

const baseConfig = {
    timeout: 1000 * 2,
    headers: {
        'Content-Type': 'application/json'
    },
}

export const readOnlyContractCall = (options: ContractCallOptions) => {
    const {network, contract, method, blockTip, sender, args} = options;
    const [contractAddress, contractName] = contract.split('.');
    const u = `${network.coreApiUrl}/v2/contracts/call-read/${contractAddress}/${contractName}/${method}?tip=${blockTip}`;

    return axios.post(u, {
        sender,
        arguments: args
    }, baseConfig).then(r => {
        if (!r.data.okay && r.data.cause) {
            throw new ContractCallError(r.data.cause);
        }

        return cvToJSON(hexToCV(r.data.result))
    });
};


export const getAccountBalance = (network: StacksNetwork, address: string, blockTip: string) => {
    const u = `${network.coreApiUrl}/v2/accounts/${address}?proof=0&tip=${blockTip}`;
    return axios.get(u, baseConfig).then(r => cvToValue(hexToCV(r.data.balance)));
}

interface AccountBalances {
    stx: {
        balance: string,
        total_sent: string,
        total_received: string,
        total_fees_sent: string,
        total_miner_rewards_received: string,
        lock_tx_id: string,
        locked: string,
        lock_height: number,
        burnchain_lock_height: number,
        burnchain_unlock_height: number
    },
    fungible_tokens: Record<string, {
        "balance": string,
        "total_sent": string,
        "total_received": string
    }>,
    non_fungible_tokens: Record<string, {
        "count": string,
        "total_sent": string,
        "total_received": string
    }>,
}

export const getAccountBalances = (network: StacksNetwork, address: string, untilBlock: number): Promise<AccountBalances> => {
    const u = `${network.coreApiUrl}/extended/v1/address/${address}/balances?until_block=${untilBlock}`;
    return axios.get(u, baseConfig).then(r => cvToValue(hexToCV(r.data.balance)));
}
