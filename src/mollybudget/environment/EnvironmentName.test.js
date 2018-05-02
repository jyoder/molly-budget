import environmentName from 'mollybudget/environment/EnvironmentName';


describe('environmentName', () => {
    it('is test by default', () => {
        expect(environmentName()).toBe('test');
    });
});
