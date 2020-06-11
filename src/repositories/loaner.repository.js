import client from './client'
import _ from 'lodash'

const BASE_URL = '/api/loaners'

export default {

    async list() {
        const loaners = await client.get(BASE_URL);
        return loaners;
    },

    async create(loaner) {
        const data = { name: loaner.name }
        const savedLoaner = await client.post(BASE_URL, data)
        return savedLoaner;
    },

    async postTransaction(loaner, transaction) {
        const data = _.pick(transaction, ['amount', 'type', 'transactionDate', 'notes'])
        const url = `${BASE_URL}/${loaner.id}/equity/transactions`

        const savedTransaction = await client.post(url, data)
        return savedTransaction
    }
};