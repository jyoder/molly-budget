export default class DailyBudget {
    constructor(id, amount, createdAt) {
        this._id = id;
        this._amount = amount;
        this._createdAt = createdAt;
    }

    id() {
        return this._id;
    }

    amount() {
        return this._amount;
    }

    createdAt() {
        return this._createdAt;
    }
}
