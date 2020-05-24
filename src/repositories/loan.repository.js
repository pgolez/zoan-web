import client from './client'

const BASE_URL = '/api/loans'

export default {

    async list() {
        const loans = await client.get('/api/loans');
        return loans;
    },

    async create(loan) {
        const data = {
            amount: loan.amount,
            borrowerId: loan.borrowerId,
            installmentCount: loan.installmentCount,
            monthlyInterest: loan.monthlyInterest
        }
        const savedLoan = await client.post(BASE_URL, data)
        return savedLoan
    }

};