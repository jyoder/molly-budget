import AppStore from 'state/AppStore';
import TransactionStore from 'state/TransactionStore';
import ValueStore from 'state/ValueStore';
import FirebaseConfigProvider from 'network/FirebaseConfigProvider';
import FirebaseProvider from 'network/FirebaseProvider';
import FirebaseAuthenticator from 'network/FirebaseAuthenticator';
import Environment from 'environment/Environment';


export default class AppStoreProvider {
    static create() {
        const firebase = this._firebase();
        const firebaseAuthenticator = FirebaseAuthenticator.create(firebase);
        return new AppStoreProvider(firebase, firebaseAuthenticator, TransactionStore);
    }
    
    static _firebase() {
        return this._firebaseProvider().getFirebase();
    }
    
    static _firebaseProvider() {
        return FirebaseProvider.create(
            new FirebaseConfigProvider(Environment.instance())
        );
    }
    
    constructor(firebase, firebaseAuthenticator, transactionStoreClass) {
        this._firebase = firebase;
        this._firebaseAuthenticator = firebaseAuthenticator;
        this._transactionStoreClass = transactionStoreClass;
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
        appStore.setAmountStore(new ValueStore(0.0));
        this._transactionStoreClass.create(
            this._firebase.database(),
            user.uid,
            (transactionStore) => {
                appStore.setTransactionStore(transactionStore);
            }
        );
    }
}
