import FirebaseProvider from 'network/FirebaseProvider';
import Environment from 'environment/Environment';

describe('create', () => {
    it('returns an instance of FirebaseProvider', () => {
        const configProvider = {};
        expect(FirebaseProvider.create(configProvider))
            .toBeInstanceOf(FirebaseProvider);
    });
});

describe('getFirebase', () => {
    it('returns a correctly configured firebase instance', () => {
        const firebase = { initializeApp: jest.fn() };
        const configProvider = { getConfig: jest.fn(() => ({ config: 'hi' })) };

        const firebaseProvider = new FirebaseProvider(firebase, configProvider);
        expect(firebaseProvider.getFirebase()).toBe(firebase);
        expect(firebase.initializeApp).toHaveBeenCalledWith({ config: 'hi' });
    });

    it('does not initialize the firebase instance on subsequent invocations', () => {
        const firebase = { initializeApp: jest.fn() };
        const configProvider = { getConfig: jest.fn(() => ({ config: 'hi' })) };
        const firebaseProvider = new FirebaseProvider(firebase, configProvider);
        
        firebaseProvider.getFirebase();
        firebaseProvider.getFirebase();
        expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
    });
});
