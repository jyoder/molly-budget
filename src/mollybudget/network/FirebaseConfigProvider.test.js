import FirebaseConfigProvider from 'mollybudget/network/FirebaseConfigProvider';
import Environment from 'mollybudget/environment/Environment';


describe('getConfig', () => {
    it('returns the stage config for the stage environment', () => {
        const environment = new Environment('stage');
        const configProvider = new FirebaseConfigProvider(environment);
        expect(configProvider.getConfig()).toEqual(_stageConfig());
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

function _stageConfig() {
    return {
        apiKey: "AIzaSyDmd2LD_8zJluy80aIGF0V02lufOUV_XG4",
        authDomain: "molly-budget-prototype.firebaseapp.com",
        databaseURL: "https://molly-budget-prototype.firebaseio.com",
        projectId: "molly-budget-prototype",
        storageBucket: "molly-budget-prototype.appspot.com",
        messagingSenderId: "621412060960"
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
