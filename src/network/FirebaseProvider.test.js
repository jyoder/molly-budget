import FirebaseProvider from 'network/FirebaseProvider';

describe('create', () => {
    it('returns a new FirebaseProvider', () => {
        expect(FirebaseProvider.create()).toBeInstanceOf(FirebaseProvider);
    });
});

describe('getFirebase', () => {
    it('returns a firebase instance', () => {
        const firebase = { initializeApp: jest.fn() }
        const firebaseProvider = new FirebaseProvider(firebase);
        expect(firebaseProvider.getFirebase()).toBe(firebase);
    });

    it('initializes the firebase instance on first invocation', () => {
        const firebase = { initializeApp: jest.fn() }
        const firebaseProvider = new FirebaseProvider(firebase);
        
        firebaseProvider.getFirebase();
        expect(firebase.initializeApp).toHaveBeenCalledWith(_config());
    });

    it('does not initialize the firebase instance on subsequent invocations', () => {
        const firebase = { initializeApp: jest.fn() }
        const firebaseProvider = new FirebaseProvider(firebase);
        
        firebaseProvider.getFirebase();
        firebaseProvider.getFirebase();
        expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
    });
});

function _config() {
    return {
        apiKey: "AIzaSyCx_fy73W9aopr9CZZYthjMUY6U1MX4-MU",
        authDomain: "molly-budget.firebaseapp.com",
        databaseURL: "https://molly-budget.firebaseio.com",
        projectId: "molly-budget",
        storageBucket: "molly-budget.appspot.com",
        messagingSenderId: "46057669757"
    };
}
