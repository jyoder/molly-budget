export default class TransactionsOnDay {
    constructor(date, transactions) {
        this._date = date;
        this._transactions = transactions;
    }

    date() {
        return this._date;
    }

    transactions() {
        return this._transactions;
    }

    total() {
        return this._transactions.reduce((sum, t) => sum + t.amount(), 0.00);
    }
}
