import environmentName from 'mollybudget/environment/EnvironmentName';


const DEVELOPMENT = 'development';
const TEST = 'test';
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

    isDevelopment() {
        return this._name === DEVELOPMENT;
    }

    isTest() {
        return this._name === TEST;
    }

    isProduction() {
        return this._name === PRODUCTION;
    }
}
