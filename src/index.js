import React from 'react';
import ReactDOM from 'react-dom';

import App from 'ui/app/App';
import FirebaseAuthenticator from 'network/FirebaseAuthenticator';
import FirebaseProvider from 'network/FirebaseProvider';
import FirebaseConfigProvider from 'network/FirebaseConfigProvider';
import Environment from 'environment/Environment';
import AppStore from 'state/AppStore';
import TransactionStore from 'state/TransactionStore';
import ValueStore from 'state/ValueStore';

import 'bootstrap/dist/css/bootstrap.css';
import 'index.css';


ReactDOM.render(<App appStore={_createAppStore()} />, document.getElementById('root'));


function _createAppStore() {
    const appStore = new AppStore();
    const firebase = _firebase();
    FirebaseAuthenticator.create(firebase).authenticate((user) => {
        appStore.setUser(user);
        appStore.setAmountStore(new ValueStore(0.0));
        TransactionStore.create(firebase.database(), user.uid, (transactionStore) => {
            appStore.setTransactionStore(transactionStore);
        });
    });
    return appStore;
}

function _firebase() {
    return _firebaseProvider().getFirebase();
}

function _firebaseProvider() {
    return FirebaseProvider.create(
        new FirebaseConfigProvider(Environment.instance())
    );
}
