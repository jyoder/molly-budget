import environmentName from 'mollybudget/environment/EnvironmentName';


describe('environmentName', () => {
    it('is development by default', () => {
        expect(environmentName()).toBe('development');
    });
});
