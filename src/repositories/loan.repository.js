import client from './client'

export default {

    async list() {
        const loans = await client.get('/api/loans');
        return loans;
    }

};