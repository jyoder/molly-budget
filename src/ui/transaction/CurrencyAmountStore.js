import { decorate, observable } from 'mobx';
import { parseCurrency } from 'ui/format/CurrencyFormat';


class CurrencyAmountStore {
    constructor() {
        this._amount = null;
    }

    setAmount(amount) {
        this._amount = parseCurrency(`${amount}`);
    }

    amount() {
        return this._amount;
    }
}

export default decorate(CurrencyAmountStore, {
    _amount: observable
});
