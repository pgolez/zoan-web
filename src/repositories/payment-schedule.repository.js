import client from './client'

const BASE_URL = '/api/payment-schedules'

export default {

    async query(dateFrom = null, dateTo = null) {
        const params = `from=${dateFrom}&to=${dateTo}`
        const payments = await client.get(`${BASE_URL}?${params}`);
        return payments;
    }

};