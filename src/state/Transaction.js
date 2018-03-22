export default class Transaction {
    constructor(id, amount, occurredOn, category) {
        this._id = id;
        this._amount = amount;
        this._occurredOn = occurredOn;
        this._category = category;
    }

    id() {
        return this._id;
    }

    amount() {
        return this._amount;
    }

    occurredOn() {
        return this._occurredOn;
    }

    category() {
        return this._category;
    }
}
