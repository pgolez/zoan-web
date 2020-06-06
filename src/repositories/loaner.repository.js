import client from './client'

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
    }
};