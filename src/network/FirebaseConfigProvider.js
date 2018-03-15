export default class FirebaseConfigProvider {
    constructor(environment) {
        this._environment = environment;
    }
    
    getConfig() {
        if(this._environment.isStage()) {
            return this._stageConfig();
        } else if(this._environment.isProduction()) {
            return this._productionConfig();
        } else {
            return null;
        }
    }

    _stageConfig() {
        return {
            apiKey: "AIzaSyDmd2LD_8zJluy80aIGF0V02lufOUV_XG4",
            authDomain: "molly-budget-prototype.firebaseapp.com",
            databaseURL: "https://molly-budget-prototype.firebaseio.com",
            projectId: "molly-budget-prototype",
            storageBucket: "molly-budget-prototype.appspot.com",
            messagingSenderId: "621412060960"
        };
    }

    _productionConfig() {
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
