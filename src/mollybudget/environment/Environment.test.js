import Environment from 'mollybudget/environment/Environment';


describe('instance', () => {
    it('returns an instance of the environment class', () => {
        expect(Environment.instance()).toBeInstanceOf(Environment);
    });

    it('returns the test environment by default', () => {
        expect(Environment.instance().name()).toBe('test');
        expect(Environment.instance().isTest());
    });
});

describe('name', () => {
    it('returns the environment name', () => {
        const environment = new Environment('test');
        expect(environment.name()).toBe('test');
    });
});

describe('isTest', () => {
    it('returns true if the environment is test', () => {
        expect(new Environment('test').isTest()).toBeTruthy();
    });

    it('returns false if the environment is not test', () => {
        expect(new Environment('production').isTest()).toBeFalsy();
    });
});

describe('isProduction', () => {
    it('returns true if the environment is production', () => {
        expect(new Environment('production').isProduction()).toBeTruthy();
    });

    it('returns false if the environment is not production', () => {
        expect(new Environment('test').isProduction()).toBeFalsy();
    });
});
