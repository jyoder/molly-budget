import FirebaseConfigProvider from 'mollybudget/network/FirebaseConfigProvider';
import Environment from 'mollybudget/environment/Environment';


describe('getConfig', () => {
    it('returns the development config for the development environment', () => {
        const environment = new Environment('development');
        const configProvider = new FirebaseConfigProvider(environment);
        expect(configProvider.getConfig()).toEqual(_developmentConfig());
    });

    it('returns the test config for the test environment', () => {
        const environment = new Environment('test');
        const configProvider = new FirebaseConfigProvider(environment);
        expect(configProvider.getConfig()).toEqual(_testConfig());
    });

    it('returns the production config for the production environment', () => {
        const environment = new Environment('production');
        const configProvider = new FirebaseConfigProvider(environment);
        expect(configProvider.getConfig()).toEqual(_productionConfig());
    });

    it('returns null for an unrecognized environment', () => {
        const environment = new Environment('hell');
        const configProvider = new FirebaseConfigProvider(environment);
        expect(configProvider.getConfig()).toBeNull();
    });
});

function _developmentConfig() {
    return {
        apiKey: "AIzaSyCnUdXPav7xCIxR-pG7qlGfHwiCOAjnFmY",
        authDomain: "molly-budget-development.firebaseapp.com",
        databaseURL: "https://molly-budget-development.firebaseio.com",
        projectId: "molly-budget-development",
        storageBucket: "molly-budget-development.appspot.com",
        messagingSenderId: "446883309052"
    };
}

function _testConfig() {
    return {
        apiKey: "AIzaSyCUu0Nh7x5-XP2KK2F2ehVFtm1F54lmzHM",
        authDomain: "molly-budget-test.firebaseapp.com",
        databaseURL: "https://molly-budget-test.firebaseio.com",
        projectId: "molly-budget-test",
        storageBucket: "molly-budget-test.appspot.com",
        messagingSenderId: "426946562620"
    };
}

function _productionConfig() {
    return {
        apiKey: "AIzaSyCx_fy73W9aopr9CZZYthjMUY6U1MX4-MU",
        authDomain: "molly-budget.firebaseapp.com",
        databaseURL: "https://molly-budget.firebaseio.com",
        projectId: "molly-budget",
        storageBucket: "molly-budget.appspot.com",
        messagingSenderId: "46057669757"
    };
}
