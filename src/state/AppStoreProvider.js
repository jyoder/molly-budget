import AppStore from 'state/AppStore';
import TransactionStore from 'state/TransactionStore';
import DailyBudgetStore from 'state/DailyBudgetStore';
import FirebaseConfigProvider from 'network/FirebaseConfigProvider';
import FirebaseProvider from 'network/FirebaseProvider';
import FirebaseAuthenticator from 'network/FirebaseAuthenticator';
import Environment from 'environment/Environment';


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
