const MAX_FLOAT = 9999999999;
const MAX_SCALE = 2;


export default class FloatBuilder {
    constructor(value = '0') {
        this._value = value;
    }

    toFloat() {
        return Number.parseFloat(this._value);
    }

    clear() {
        return new FloatBuilder('0');
    }

    zero() {
        return this._isZero() ? this : this._append('0');
    }

    one() {
        return this._append('1');
    }

    two() {
        return this._append('2');
    }

    three() {
        return this._append('3');
    }

    four() {
        return this._append('4');
    }

    five() {
        return this._append('5');
    }

    six() {
        return this._append('6');
    }

    seven() {
        return this._append('7');
    }

    eight() {
        return this._append('8');
    }

    nine() {
        return this._append('9');
    }

    point() {
        return this._hasDecimalPoint() ? this : this._append('.');
    }

    _append(digit) {
        const newValue = this._value + digit;
        return this._valid(newValue) ? new FloatBuilder(newValue) : this;
    }

    _isZero() {
        return this._value === '0';
    }

    _hasDecimalPoint() {
        return this._value.indexOf('.') !== -1;
    }

    _valid(value) {
        return !this._exceedsMax(value) && !this._exceedsMaxScale(value);
    }

    _exceedsMax(value) {
        return Number.parseFloat(value) > MAX_FLOAT;
    }

    _exceedsMaxScale(value) {
        return this._scale(value) > MAX_SCALE;
    }

    _scale(value) {
        const index = value.indexOf('.');
        return index > 0 ? (value.length - index) - 1 : 0;
    }
}
