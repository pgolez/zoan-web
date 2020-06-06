import client from './client'

const BASE_URL = '/api/payments'

export default {

    async list() {
        const payments = await client.get(BASE_URL);
        return payments;
    },

    async create(payment) {
        const data = {
            payerId: payment.loan.borrower.id,
            loanId: payment.loan.id,
            amount: payment.amount,
            transactionDate: payment.transactionDate.utc().format('MM-DD-YYYY')
        }
        return await client.post(BASE_URL, data)
    }

};