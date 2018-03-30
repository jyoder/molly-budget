import ValueStore from 'state/ValueStore';


describe('value', () => {
    it('returns null if no value has been set', () => {
        const valueStore = new ValueStore();
        expect(valueStore.value()).toBeNull();
    });
});

describe('setValue', () => {
    it('sets the value in the store', () => {
        const valueStore = new ValueStore();
        valueStore.setValue('someValue');
        expect(valueStore.value()).toBe('someValue');
    });
});
