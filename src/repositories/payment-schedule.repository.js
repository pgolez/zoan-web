import client from './client'

const BASE_URL = '/api/payment-schedules'

export default {

    async query(dateFrom, dateTo) {
        dateFrom
        dateTo
        const payments = await client.get(BASE_URL);
        return payments;
    }

};