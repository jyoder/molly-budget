import AppStore from 'state/AppStore';


describe('initialized', () => {
    it('returns false if the user is missing', () => {
        const appStore = new AppStore();
        appStore.setAmountStore({});
        appStore.setTransactionStore({});
        expect(appStore.initialized).toBeFalsy();
    });

    it('returns false if the transaction store is missing', () => {
        const appStore = new AppStore();
        appStore.setUser({});
        appStore.setAmountStore({});
        expect(appStore.initialized).toBeFalsy();
    });

    it('returns false if the amount store is missing', () => {
        const appStore = new AppStore();
        appStore.setUser({});
        appStore.setTransactionStore({});
        expect(appStore.initialized).toBeFalsy();
    });

    it('returns true if the user, amount store, and transaction store are present', () => {
        const appStore = new AppStore();
        appStore.setUser({});
        appStore.setAmountStore({});
        appStore.setTransactionStore({});
        expect(appStore.initialized).toBeTruthy();
    });
});

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

describe('amountStore', () => {
    it('returns the amount store', () => {
        const appStore = new AppStore();
        const amountStore = {};
        appStore.setAmountStore(amountStore);
        expect(appStore.amountStore()).toEqual(amountStore);
    });
});

describe('setAmountStore', () => {
    it('sets the amount store', () => {
        const appStore = new AppStore();
        const amountStore = {};
        appStore.setAmountStore(amountStore);
        expect(appStore.amountStore()).toEqual(amountStore);
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
