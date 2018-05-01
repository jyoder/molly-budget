import environmentName from 'mollybudget/environment/EnvironmentName';


const STAGE = 'stage';
const PRODUCTION = 'production';

export default class Environment {
    static instance() {
        return new Environment(environmentName());
    }

    constructor(name) {
        this._name = name;
    }

    name() {
        return this._name;
    }

    isStage() {
        return this._name === STAGE;
    }

    isProduction() {
        return this._name === PRODUCTION;
    }
}
