import * as firebase from 'firebase/app';
import 'firebase/auth';


export default class FirebaseProvider {
    static create(configProvider) {
        return new FirebaseProvider(firebase, configProvider);
    }

    constructor(firebase, configProvider) {
        this._firebase = firebase;
        this._configProvider = configProvider;
        this._initialized = false;
    }

    getFirebase() {
        this._ensureInitialized();
        return this._firebase;
    }

    _ensureInitialized() {
        if(!this._initialized) {
            this._firebase.initializeApp(this._configProvider.getConfig());
            this._initialized = true;
        }
    }
}
