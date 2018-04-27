import AppStore from 'mollybudget/state/AppStore';
import TransactionStore from 'mollybudget/state/TransactionStore';
import DailyBudgetStore from 'mollybudget/state/DailyBudgetStore';
import FirebaseConfigProvider from 'mollybudget/network/FirebaseConfigProvider';
import FirebaseProvider from 'mollybudget/network/FirebaseProvider';
import FirebaseAuthenticator from 'mollybudget/network/FirebaseAuthenticator';
import Environment from 'mollybudget/environment/Environment';


export default class AppStoreProvider {
    static create() {
        const firebase = this._firebase();
        const firebaseAuthenticator = FirebaseAuthenticator.create(firebase);
        return new AppStoreProvider(firebase, firebaseAuthenticator, TransactionStore, DailyBudgetStore);
    }
    
    static _firebase() {
        return this._firebaseProvider().getFirebase();
    }
    
    static _firebaseProvider() {
        return FirebaseProvider.create(
            new FirebaseConfigProvider(Environment.instance())
        );
    }
    
    constructor(firebase, firebaseAuthenticator, transactionStoreClass, dailyBudgetStoreClass) {
        this._firebase = firebase;
        this._firebaseAuthenticator = firebaseAuthenticator;
        this._transactionStoreClass = transactionStoreClass;
        this._dailyBudgetStoreClass = dailyBudgetStoreClass;
    }

    getAppStore() {
        const appStore = new AppStore();
        this._firebaseAuthenticator.authenticate((user) => {
            this._startAppStoreInitialization(user, appStore);
        });
        return appStore;       
    }

    _startAppStoreInitialization(user, appStore) {
        appStore.setUser(user);
        this._transactionStoreClass.create(
            this._firebase.database(),
            user.uid,
            (transactionStore) => {
                appStore.setTransactionStore(transactionStore);
            }
        );
        this._dailyBudgetStoreClass.create(
            this._firebase.database(),
            user.uid,
            (dailyBudgetStore) => {
                appStore.setDailyBudgetStore(dailyBudgetStore);
            }
        );
    }
}
