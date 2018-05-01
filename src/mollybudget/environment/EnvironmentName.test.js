import environmentName from 'mollybudget/environment/EnvironmentName';


describe('ENVIRONMENT_NAME', () => {
    it('is stage by default', () => {
        expect(environmentName()).toBe('stage');
    });
});
