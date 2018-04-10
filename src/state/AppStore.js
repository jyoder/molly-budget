import { decorate, observable, computed, action } from 'mobx';


class AppStore {
    constructor() {
        this._user = null;
        this._amountStore = null;
        this._transactionStore = null;
    }

    get initialized() {
        return this._user && 
            this._amountStore &&
            this._transactionStore &&
            this._dailyBudgetStore;
    }

    user() {
        return this._user;
    }

    setUser(user) {
        this._user = user;
    }

    amountStore() {
        return this._amountStore;
    }

    setAmountStore(amountStore) {
        this._amountStore = amountStore;
    }

    transactionStore() {
        return this._transactionStore;
    }

    setTransactionStore(transactionStore) {
        this._transactionStore = transactionStore;
    }

    dailyBudgetStore() {
        return this._dailyBudgetStore;
    }

    setDailyBudgetStore(dailyBudgetStore) {
        this._dailyBudgetStore = dailyBudgetStore;
    }
};

export default decorate(AppStore, {
    _user: observable,
    setUser: action,
    _amountStore: observable,
    setAmountStore: action,
    _transactionStore: observable,
    setTransactionStore: action,
    _dailyBudgetStore: observable,
    setDailyBudgetStore: action,
    initialized: computed
});
