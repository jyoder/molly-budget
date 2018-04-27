import firebase from 'firebase/app';
import 'firebase/auth';


export default class FirebaseAuthenticator {
    static create(firebase) {
        return new FirebaseAuthenticator(firebase.auth());
    }

    constructor(firebaseAuth) {
        this._firebaseAuth = firebaseAuth;
    }

    authenticate(onAuthenticated) {
        this._firebaseAuth.onAuthStateChanged((user) => {
            if(user) {
                onAuthenticated(user);
            } else {
                this._signIn();
            }
        });
    }

    _signIn() {
        this._firebaseAuth.signInWithRedirect(
            new firebase.auth.GoogleAuthProvider()
        ).catch((error) => {
            console.error(error);
        });
    }
}
