import { decorate, observable } from 'mobx';
import { parseCurrency } from 'ui/format/CurrencyFormat';


class CurrencyAmountStore {
    constructor() {
        this._amount = null;
    }

    setAmount(amount) {
        const float = parseCurrency(`${amount}`);
        if(float) {
            this._amount = float;
        }
    }

    amount() {
        return this._amount;
    }
}

export default decorate(CurrencyAmountStore, {
    _amount: observable
});
