import client from './client'

export default {

    async list() {
        const funds = await client.get('/api/funds');
        return funds;
    }

};