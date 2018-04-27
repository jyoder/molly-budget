import Environment from 'mollybudget/environment/Environment';


describe('instance', () => {
    it('returns an instance of the environment class', () => {
        expect(Environment.instance()).toBeInstanceOf(Environment);
    });

    it('returns the stage environment by default', () => {
        expect(Environment.instance().name()).toBe('stage');
        expect(Environment.instance().isStage());
    });
});

describe('name', () => {
    it('returns the environment name', () => {
        const environment = new Environment('stage');
        expect(environment.name()).toBe('stage');
    });
});

describe('isStage', () => {
    it('returns true if the environment is stage', () => {
        expect(new Environment('stage').isStage()).toBeTruthy();
    });

    it('returns false if the environment is not stage', () => {
        expect(new Environment('production').isStage()).toBeFalsy();
    });
});

describe('isProduction', () => {
    it('returns true if the environment is production', () => {
        expect(new Environment('production').isProduction()).toBeTruthy();
    });

    it('returns false if the environment is not production', () => {
        expect(new Environment('stage').isProduction()).toBeFalsy();
    });
});
