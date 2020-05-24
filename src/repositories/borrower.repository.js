import client from './client'

export default {

    async list() {
        const borrowers = await client.get('/api/borrowers');
        return borrowers;
    }

};