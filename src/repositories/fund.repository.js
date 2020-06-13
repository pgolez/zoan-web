import client from './client'


const BASE_URL = '/api/funds'

export default {

    async list() {
        const funds = await client.get(BASE_URL);
        return funds;
    },

    async create(fund) {
        const savedFund = await client.post(BASE_URL, fund)
        return savedFund
    }

};