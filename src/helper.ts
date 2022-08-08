import axios from 'axios';
import {cvToJSON, hexToCV} from '@stacks/transactions';
import {ContractCallOptions} from './types';

class ContractCallError extends Error {
    cause: string;

    constructor(message: string) {
        super(message);
        this.cause = message;
    }
}

export const readOnlyContractCall = (options: ContractCallOptions) => {
    const {network, contract, method, blockTip, sender, args} = options;
    const [contractAddress, contractName] = contract.split('.');
    const u = `${network.coreApiUrl}/v2/contracts/call-read/${contractAddress}/${contractName}/${method}?tip=${blockTip}`;

    return axios.post(u, {
        sender,
        arguments: args
    }, {
        timeout: 1000 * 2,
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => {
        if (!r.data.okay && r.data.cause) {
            throw new ContractCallError(r.data.cause);
        }

        return cvToJSON(hexToCV(r.data.result))
    })
};
