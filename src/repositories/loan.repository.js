import client from './client'

const BASE_URL = '/api/loans'

export default {

    async list() {
        const loans = await client.get(BASE_URL);
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
    },

    async update(loan) {
        const data = {
            amount: loan.amount,
            borrowerId: loan.borrowerId,
            installmentCount: loan.installmentCount,
            monthlyInterest: loan.monthlyInterest,
            fundId: loan.fundId
        }
        const updatedLoan = await client.put(`${BASE_URL}/${loan.id}`, data)
        return updatedLoan
    },

    async activate(loan) {
        const activatedLoan = await client.post(`${BASE_URL}/${loan.id}/activate`)
        return activatedLoan
    }
};