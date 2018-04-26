import Transaction from 'state/Transaction';


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
        return Transaction.totalExpenses(this._transactions);
    }
}
