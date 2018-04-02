export default class Budget {
    static create(accrual_rate, transactions) {
        return new Budget(new Date(), accrual_rate, transactions);
    }

    constructor(date, accrual_rate, transactions) {
        this._date = date;
        this._accrual_rate = accrual_rate;
        this._transactions = transactions;
    }

    current() {
        return this._amountAccrued() - this._amountSpent();
    }

    _amountAccrued() {
        return this._date.getDate() * this._accrual_rate;
    }

    _amountSpent() {
        return this._transactionsThisMonth().reduce((sum, t) => sum + t.amount(), 0.00);
    }

    _transactionsThisMonth() {
        return this._transactions.filter((transaction) => this._occurredThisMonth(transaction));
    }

    _occurredThisMonth(transaction) {
        return this._date.getMonth() === transaction.occurredAt().getMonth();
    }
}
