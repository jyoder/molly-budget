export default class Transaction {
    constructor(id, amount, occurredAt, category) {
        this._id = id;
        this._amount = amount;
        this._occurredAt = occurredAt;
        this._category = category;
    }

    id() {
        return this._id;
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
