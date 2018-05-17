import Transaction from 'mollybudget/transaction/model/Transaction';

export default class RolloverTransaction {
    constructor(id, signedAmount, occurredAt) {
        this._id = id;
        this._signedAmount = signedAmount;
        this._occurredAt = occurredAt;
    }

    id() {
        return this._id;
    }

    type() {
        return this._signedAmount < 0.00 ? Transaction.EXPENSE : Transaction.INCOME;
    }

    amount() {
        return Math.abs(this._signedAmount);
    }

    occurredAt() {
        return this._occurredAt;
    }

    category() {
        return 'Rollover';
    }
}