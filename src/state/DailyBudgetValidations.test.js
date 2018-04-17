import targaryen from 'targaryen';
import DatabaseRulesLoader from 'test/DatabaseRulesLoader';


let rules = null;

beforeAll(async () => {
    rules = await DatabaseRulesLoader.loadRules();
});


describe('dailyBudgets', () => {
    it('allows saving a new daily budget with all required fields', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed, newDatabase } = database.write('/accounts/userId/dailyBudgets/abcd', {
            id: 'abcd',
            amount: 15.00,
            createdAt: '2018-04-17T03:50:53.161Z'
        });
        expect(allowed).toBeTruthy();
    });

    it('disallows saving a new daily budget for a different user', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed, newDatabase } = database.write('/accounts/otherUserId/dailyBudgets/abcd', {
            id: 'abcd',
            amount: 15.00,
            createdAt: '2018-04-17T03:50:53.161Z'
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows overwriting an existing daily budget with all required fields', () => {
        const initialData = {
            accounts: {
                userId: {
                    dailyBudgets: {
                        abcd: {
                            id: 'abcd',
                            amount: 15.00,
                            createdAt: '2018-04-17T03:50:53.161Z'
                        }
                    }
                }
            }
        };

        const database = targaryen.database(rules, initialData).as({ uid: 'userId' });
        const { allowed, newDatabase } = database.write('/accounts/userId/dailyBudgets/abcd', {
            id: 'abcd',
            amount: 15.00,
            createdAt: '2018-04-17T03:50:53.161Z'
        });
        expect(allowed).toBeFalsy();
    });
});

describe('id', () => {
    it('disallows saving a daily budget without an id', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/dailyBudgets/abcd', {
            amount: 15.00,
            createdAt: '2018-04-17T03:50:53.161Z',
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows saving a daily budget where the id is not a string', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/dailyBudgets/abcd', {
            id: 123,
            amount: 15.00,
            createdAt: '2018-04-17T03:50:53.161Z'
        });
        expect(allowed).toBeFalsy();
    });
});

describe('amount', () => {
    it('disallows saving a daily budget without an amount', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/dailyBudgets/abcd', {
            id: 'abcd',
            occurredAt: '2018-04-17T03:50:53.161Z'
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows saving a daily budget where the amount is not a number', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/dailyBudgets/abcd', {
            id: 'abcd',
            amount: 'some string',
            createdAt: '2018-04-17T03:50:53.161Z'
        });
        expect(allowed).toBeFalsy();
    });
});

describe('createdAt', () => {
    it('disallows saving a daily budget without a createdAt', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/dailyBudgets/abcd', {
            id: 'abcd',
            amount: 15.00
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows saving a daily budget where the createdAt is not a string', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/dailyBudgets/abcd', {
            id: 'abcd',
            amount: 15.00,
            createdAt: 123
        });
        expect(allowed).toBeFalsy();
    });
});
