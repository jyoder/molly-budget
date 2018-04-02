import { decorate, observable } from 'mobx';


class ValueStore {
    constructor(value = null) {
        this._value = value;
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
