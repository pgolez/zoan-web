import moment from 'moment'

export default class {

    constructor(loan) {
        this.loan = loan
    }

    generate() {
        const dueDateGenerator = new PaymentScheduleDueDateGenerator(this.loan)
        return [...Array(this.loan.installmentCount).keys()].map((index) => {
            return {
                order: (index + 1),
                amount: this.installmentPayable(),
                profit: this.installmentProfit(),
                dueDate: dueDateGenerator.next().format('MM/DD/YYYY')
            }
        })
    }

    installmentPayable() {
        return (this.totalProfit() + this.loan.amount) / this.loan.installmentCount
    }

    installmentProfit() {
        return this.totalProfit() / this.loan.installmentCount
    }

    totalProfit() {
        return this.loan.amount * this.loan.monthlyInterest * this.monthCount()
    }

    monthCount() {
        return this.loan.installmentCount / 2;
    }
}

class PaymentScheduleDueDateGenerator {

    constructor(loan) {
        this.loan = loan;
        this.loanDate = moment();
        this.nextDueDate = this._computeNextDueDate(this.loanDate)
    }

    next() {
        const dueDate = this.nextDueDate
        this.nextDueDate = this._computeNextDueDate(this.nextDueDate)
        return dueDate
    }

    _computeNextDueDate(dueDate) {
        const nextDay = moment(dueDate).add(1, 'days')
        if (nextDay.date() <= 15) {
            return moment(nextDay).date(15)
        } else {
            return moment(dueDate).endOf('month')
        }
    }

}