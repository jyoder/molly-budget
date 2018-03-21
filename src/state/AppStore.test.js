import AppStore from 'state/AppStore';


describe('getUser', () => {
    it('returns the user', () => {
        const appStore = new AppStore();
        const user = {};
        appStore.setUser(user);
        expect(appStore.user()).toEqual(user);
    });
});

describe('setUser', () => {
    it('sets the user', () => {
        const appStore = new AppStore();
        const user = {};
        appStore.setUser(user);
        expect(appStore.user()).toEqual(user);
    });
});

describe('transactionStore', () => {
    it('returns the transaction store', () => {
        const appStore = new AppStore();
        const transactionStore = {};
        appStore.setTransactionStore(transactionStore);
        expect(appStore.transactionStore()).toEqual(transactionStore);
    });
});

describe('setTransactionStore', () => {
    it('sets the transaction store', () => {
        const appStore = new AppStore();
        const transactionStore = {};
        appStore.setTransactionStore(transactionStore);
        expect(appStore.transactionStore()).toEqual(transactionStore);
    });
});
