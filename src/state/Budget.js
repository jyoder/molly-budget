export default class Budget {
    static create(accumulation_rate) {
        return new Budget(new Date(), accumulation_rate);
    }

    constructor(date, accumulation_rate) {
        this._date = date;
        this._accumulation_rate = accumulation_rate;
    }

    current() {
        return this._date.getDate() * this._accumulation_rate;
    }
}
