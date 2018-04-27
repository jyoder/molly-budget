import AppStore from 'mollybudget/state/AppStore';


describe('initialized', () => {
    it('returns false if the user is missing', () => {
        const appStore = new AppStore();
        appStore.setTransactionStore({});
        appStore.setDailyBudgetStore({});
        expect(appStore.initialized).toBeFalsy();
    });

    it('returns false if the transaction store is missing', () => {
        const appStore = new AppStore();
        appStore.setUser({});
        appStore.setDailyBudgetStore({});
        expect(appStore.initialized).toBeFalsy();
    });

    it('returns false if the daily budget store is missing', () => {
        const appStore = new AppStore();
        appStore.setUser({});
        appStore.setTransactionStore({});
        expect(appStore.initialized).toBeFalsy();
    });

    it('returns true if the user, transaction store, and daily budget store are present', () => {
        const appStore = new AppStore();
        appStore.setUser({});
        appStore.setTransactionStore({});
        appStore.setDailyBudgetStore({});
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

describe('dailyBudgetStore', () => {
    it('returns the daily budget store', () => {
        const appStore = new AppStore();
        const dailyBudgetStore = {};
        appStore.setDailyBudgetStore(dailyBudgetStore);
        expect(appStore.dailyBudgetStore()).toEqual(dailyBudgetStore);
    });
});

describe('setDailyBudgetStore', () => {
    it('sets the daily budget store', () => {
        const appStore = new AppStore();
        const dailyBudgetStore = {};
        appStore.setDailyBudgetStore(dailyBudgetStore);
        expect(appStore.dailyBudgetStore()).toEqual(dailyBudgetStore);
    });
});
