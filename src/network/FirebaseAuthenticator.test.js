import FirebaseAuthenticator from 'network/FirebaseAuthenticator';
import * as firebase from 'firebase/app';
import 'firebase/auth';


describe('authenticate', () => {
    it('awaits an authentication state change from firebase', () => {
        const firebaseAuth = { onAuthStateChanged: jest.fn() };
        const authenticator = new FirebaseAuthenticator(firebaseAuth);
        
        authenticator.authenticate(() => {});
        expect(firebaseAuth.onAuthStateChanged).toHaveBeenCalledTimes(1);
    });

    it('invokes the given callback when the user is authenticated', () => {
        const firebaseAuth = { onAuthStateChanged: jest.fn() };
        const authenticator = new FirebaseAuthenticator(firebaseAuth);
        const onAuthenticated = jest.fn();

        authenticator.authenticate(onAuthenticated);
        firebaseAuth.onAuthStateChanged.mock.calls[0][0]('John');
        expect(onAuthenticated).toHaveBeenCalledWith('John');
    });

    it('asks the user to sign in if they have not yet been authenticated', () => {
        const catchClause = {};
        catchClause['catch'] = jest.fn();

        const firebaseAuth = {
            onAuthStateChanged: jest.fn(),
            signInWithRedirect: jest.fn(() => catchClause)
        };
        const authenticator = new FirebaseAuthenticator(firebaseAuth);
        const onAuthenticated = jest.fn();

        authenticator.authenticate(onAuthenticated);
        firebaseAuth.onAuthStateChanged.mock.calls[0][0](null);
        expect(onAuthenticated).not.toHaveBeenCalled();
        expect(firebaseAuth.signInWithRedirect.mock.calls[0][0])
            .toBeInstanceOf(firebase.auth.GoogleAuthProvider);
        expect(catchClause.catch).toHaveBeenCalledTimes(1);
    });
});
