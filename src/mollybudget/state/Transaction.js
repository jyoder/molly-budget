export default class Transaction {
    static EXPENSE = 1;
    static INCOME = 2;

    static totalExpenses(transactions) {
        return transactions.reduce(
            (sum, t) => (
                t.type() === Transaction.EXPENSE ?
                    sum + t.amount() :
                    sum - t.amount()),
                0.00
        );
    }

    constructor(id, amount, occurredAt, category) {
        this._id = id;
        this._amount = amount;
        this._occurredAt = occurredAt;
        this._category = category;
    }

    id() {
        return this._id;
    }

    type() {
        if(this._category === 'Income') {
            return Transaction.INCOME;
        } else {
            return Transaction.EXPENSE;
        }
    }

    amount() {
        return this._amount;
    }

    occurredAt() {
        return this._occurredAt;
    }

    category() {
        return this._category;
    }
}
