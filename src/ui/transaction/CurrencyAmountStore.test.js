import CurrencyAmountStore from 'ui/transaction/CurrencyAmountStore';

describe('setAmount', () => {
    it('sets the currency amount when given a string with a valid float', () => {
        const currencyAmountStore = new CurrencyAmountStore();
        currencyAmountStore.setAmount('123.11');
        expect(currencyAmountStore.amount()).toBeCloseTo(123.11);
    });

    it('does not set the currency amount when given a string without a valid float', () => {
        const currencyAmountStore = new CurrencyAmountStore();
        currencyAmountStore.setAmount('12a3.11');
        expect(currencyAmountStore.amount()).toBeNull();
    });

    it('sets the currency amount when given a float', () => {
        const currencyAmountStore = new CurrencyAmountStore();
        currencyAmountStore.setAmount(123.11);
        expect(currencyAmountStore.amount()).toBeCloseTo(123.11);
    });

    it('replaces the previous value with null if a valid float becomes invalid', () => {
        const currencyAmountStore = new CurrencyAmountStore();
        currencyAmountStore.setAmount('1');
        currencyAmountStore.setAmount('1+1');
        expect(currencyAmountStore.amount()).toBe(null);
    });
});

describe('amount', () => {
    it('returns the Currency amount', () => {
        const currencyAmountStore = new CurrencyAmountStore();
        currencyAmountStore.setAmount('123.11');
        expect(currencyAmountStore.amount()).toBeCloseTo(123.11);
    });

    it('returns null initially', () => {
        const currencyAmountStore = new CurrencyAmountStore();
        expect(currencyAmountStore.amount()).toBeNull();
    });
});
