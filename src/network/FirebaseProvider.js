import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class FirebaseProvider {
    static create() {
        return new FirebaseProvider(firebase);
    }

    constructor(firebase) {
        this._firebase = firebase;
        this._initialized = false;
    }

    getFirebase() {
        this._ensureInitialized();
        return this._firebase;
    }

    _ensureInitialized() {
        if(!this._initialized) {
            this._firebase.initializeApp(this._config());
            this._initialized = true;
        }
    }

    _config() {
        return {
            apiKey: "AIzaSyCx_fy73W9aopr9CZZYthjMUY6U1MX4-MU",
            authDomain: "molly-budget.firebaseapp.com",
            databaseURL: "https://molly-budget.firebaseio.com",
            projectId: "molly-budget",
            storageBucket: "molly-budget.appspot.com",
            messagingSenderId: "46057669757"
        };
    }
}
