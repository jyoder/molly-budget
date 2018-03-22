import { decorate, observable, computed, action } from 'mobx';


class AppStore {
    get initialized() {
        return this._user && this._transactionStore;
    }

    user() {
        return this._user;
    }

    setUser(user) {
        this._user = user;
    }

    transactionStore() {
        return this._transactionStore;
    }

    setTransactionStore(transactionStore) {
        this._transactionStore = transactionStore;
    }
};

export default decorate(AppStore, {
    _user: observable,
    setUser: action,
    _transactionStore: observable,
    setTransactionStore: action,
    initialized: computed
});
