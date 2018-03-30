import { decorate, observable } from 'mobx';


class ValueStore {
    constructor() {
        this._value = null;
    }

    setValue(value) {
        this._value = value;
    }

    value() {
        return this._value;
    }
}

export default decorate(ValueStore, {
    _value: observable
});
