export default class FirebaseConfigProvider {
    constructor(environment) {
        this._environment = environment;
    }
    
    getConfig() {
        if(this._environment.isDevelopment()) {
            return this._developmentConfig();
        } else if(this._environment.isTest()) {
            return this._testConfig();
        } else if(this._environment.isProduction()) {
            return this._productionConfig();
        } else {
            return null;
        }
    }

    _developmentConfig() {
        return {
            apiKey: "AIzaSyCnUdXPav7xCIxR-pG7qlGfHwiCOAjnFmY",
            authDomain: "app.development.mollybudget.com",
            databaseURL: "https://molly-budget-development.firebaseio.com",
            projectId: "molly-budget-development",
            storageBucket: "molly-budget-development.appspot.com",
            messagingSenderId: "446883309052"
        };
    }

    _testConfig() {
        return {
            apiKey: "AIzaSyCUu0Nh7x5-XP2KK2F2ehVFtm1F54lmzHM",
            authDomain: "app.test.mollybudget.com",
            databaseURL: "https://molly-budget-test.firebaseio.com",
            projectId: "molly-budget-test",
            storageBucket: "molly-budget-test.appspot.com",
            messagingSenderId: "426946562620"
        };
    }

    _productionConfig() {
        return {
            apiKey: "AIzaSyCx_fy73W9aopr9CZZYthjMUY6U1MX4-MU",
            authDomain: "app.mollybudget.com",
            databaseURL: "https://molly-budget.firebaseio.com",
            projectId: "molly-budget",
            storageBucket: "molly-budget.appspot.com",
            messagingSenderId: "46057669757"
        };
    }
}
