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
