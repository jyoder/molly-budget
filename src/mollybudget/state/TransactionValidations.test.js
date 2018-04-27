import targaryen from 'targaryen';
import DatabaseRulesLoader from 'mollybudget/test/DatabaseRulesLoader';


let rules = null;

beforeAll(async () => {
    rules = await DatabaseRulesLoader.loadRules();
});


describe('transaction', () => {
    it('allows saving a new transaction with all required fields', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed, newDatabase } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeTruthy();
    });

    it('disallows saving a new transaction for a different user', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed, newDatabase } = database.write('/accounts/otherUserId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows overwriting an existing transaction with all required fields', () => {
        const initialData = {
            accounts: {
                userId: {
                    transactions: {
                        abcd: {
                            id: 'abcd',
                            amount: 15.00,
                            occurredAt: '2018-04-17T03:50:53.161Z',
                            category: 'General'
                        }
                    }
                }
            }
        };

        const database = targaryen.database(rules, initialData).as({ uid: 'userId' });
        const { allowed, newDatabase } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });
});

describe('id', () => {
    it('disallows saving a transaction without an id', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows saving a transaction where the id is not a string', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 123,
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });
});

describe('amount', () => {
    it('disallows saving a transaction without an amount', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows saving a transaction where the amount is not a number', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 'some string',
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });
});

describe('occurredAt', () => {
    it('disallows saving a transaction without an occurredAt', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });

    it('disallows saving a transaction where the occurredAt is not a string', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: 123,
            category: 'General'
        });
        expect(allowed).toBeFalsy();
    });
});

describe('category', () => {
    it('disallows saving a transaction with an unknown category', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'Pandas'
        });
        expect(allowed).toBeFalsy();
    });

    it('allows saving a transaction with the General category', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'General'
        });
        expect(allowed).toBeTruthy();
    });

    it('allows saving a transaction with the Outing category', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'Outing'
        });
        expect(allowed).toBeTruthy();
    });

    it('allows saving a transaction with the Car category', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'Car'
        });
        expect(allowed).toBeTruthy();
    });

    it('allows saving a transaction with the Groceries category', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'Groceries'
        });
        expect(allowed).toBeTruthy();
    });

    it('allows saving a transaction with the Income category', () => {
        const database = targaryen.database(rules, {}).as({ uid: 'userId' });
        const { allowed } = database.write('/accounts/userId/transactions/abcd', {
            id: 'abcd',
            amount: 15.00,
            occurredAt: '2018-04-17T03:50:53.161Z',
            category: 'Income'
        });
        expect(allowed).toBeTruthy();
    });
});
