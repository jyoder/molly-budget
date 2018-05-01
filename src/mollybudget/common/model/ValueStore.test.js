import ValueStore from 'mollybudget/common/model/ValueStore';


describe('value', () => {
    it('returns null if no value has been set', () => {
        const valueStore = new ValueStore();
        expect(valueStore.value()).toBeNull();
    });

    it('returns the optional initial value supplied in the constructor', () => {
        const valueStore = new ValueStore(1);
        expect(valueStore.value()).toBe(1);
    })
});

describe('setValue', () => {
    it('sets the value in the store', () => {
        const valueStore = new ValueStore();
        valueStore.setValue('someValue');
        expect(valueStore.value()).toBe('someValue');
    });
});
