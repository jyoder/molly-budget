import AppStoreProvider from 'state/AppStoreProvider';


describe('create', () => {
    it('returns a new instance of AppStoreProvider', () => {
        const appStoreProvider = AppStoreProvider.create();
        expect(appStoreProvider).toBeInstanceOf(AppStoreProvider);
    });
}); 

describe('getAppStore', () => {
    it('returns an AppStore that is in the process of initializing', () => {
        const auth = jest.fn(() => ({
            onAuthStateChanged: jest.fn()
        }));
        const firebase = {
            auth: auth
        };

        const authenticate = jest.fn();
        const firebaseAuthenticator = {
            authenticate: authenticate
        };
        const appStoreProvider = new AppStoreProvider(firebase, firebaseAuthenticator, {});
        const appStore = appStoreProvider.getAppStore();

        expect(appStore.initialized).toBeFalsy();
    });

    it('returns an AppStore that eventually completes initialization', () => {
        const ref = jest.fn();
        const database = jest.fn(() => { ref: ref });
        const firebase = { database: database };     
        
        const authenticate = jest.fn();
        const firebaseAuthenticator = {
            authenticate: authenticate
        };

        const create = jest.fn();
        const transactionStoreClass = { create: create };

        const appStoreProvider = new AppStoreProvider(
            firebase,
            firebaseAuthenticator,
            transactionStoreClass
        );
        const appStore = appStoreProvider.getAppStore();

        const user = { uid: '123' };
        authenticate.mock.calls[0][0](user);

        const transactionStore = {};
        create.mock.calls[0][2](transactionStore);

        expect(appStore.initialized).toBeTruthy();
    });
});
