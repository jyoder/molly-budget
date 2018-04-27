import DailyBudgetStore from 'state/DailyBudgetStore';
import DailyBudget from 'state/DailyBudget';


describe('create', () => {
    it('creates a new daily budget store and wires up the database ref', () => {
        const firebaseDatabase = _firebaseDatabase();
        const dailyBudgetStore = DailyBudgetStore.create(firebaseDatabase, 'john', jest.fn());
        
        expect(firebaseDatabase.ref).toHaveBeenCalledWith('/accounts/john/dailyBudgets');
        expect(firebaseDatabase.ref().on).toHaveBeenCalledTimes(1);

        firebaseDatabase.ref().on.mock.calls[0][1](_snapshot());
        const dailyBudget1 = new DailyBudget('id1', 123, new Date(2018, 2, 1));
        const dailyBudget2 = new DailyBudget('id2', 124, new Date(2018, 2, 2));
        expect(dailyBudgetStore.dailyBudgets().slice()).toEqual([dailyBudget1, dailyBudget2]);
    });

    it('invokes the onInitialized callback once upon first reception of daily budgets', () => {
        const firebaseDatabase = _firebaseDatabase();
        const onInitialized = jest.fn();
        const dailyBudgetStore = DailyBudgetStore.create(firebaseDatabase, 'john', onInitialized);
        
        expect(firebaseDatabase.ref).toHaveBeenCalledWith('/accounts/john/dailyBudgets');
        expect(firebaseDatabase.ref().on).toHaveBeenCalledTimes(1);

        firebaseDatabase.ref().on.mock.calls[0][1](_snapshot());
        expect(onInitialized).toHaveBeenCalledWith(dailyBudgetStore);

        firebaseDatabase.ref().on.mock.calls[0][1](_snapshot());
        expect(onInitialized).toHaveBeenCalledTimes(1);
    });

    it('handles the case where the database snapshot value is null', () => {
        const firebaseDatabase = _firebaseDatabase();
        const dailyBudgetStore = DailyBudgetStore.create(firebaseDatabase, 'john');
        
        expect(firebaseDatabase.ref).toHaveBeenCalledWith('/accounts/john/dailyBudgets');
        expect(firebaseDatabase.ref().on).toHaveBeenCalledTimes(1);

        firebaseDatabase.ref().on.mock.calls[0][1]({ val: () => null });
        expect(dailyBudgetStore.dailyBudgets().slice()).toEqual([]);
    });
});

describe('dailyBudgets', () => {
    it('returns a list of daily budgets in the store', () => {
        const dailyBudgets = [
            new DailyBudget('id1', 11, new Date()),
            new DailyBudget('id2', 30, new Date())
        ];
        const dailyBudgetStore = new DailyBudgetStore(_dailyBudgetsRef(), dailyBudgets);
        expect(dailyBudgetStore.dailyBudgets().slice()).toEqual(dailyBudgets);
    });
});

describe('currentDailyBudget', () => {
    it('returns the last (most recent) daily budget in the list', () => {
        const dailyBudgets = [
            new DailyBudget('id1', 11, new Date()),
            new DailyBudget('id2', 30, new Date())
        ];
        const dailyBudgetStore = new DailyBudgetStore(_dailyBudgetsRef(), dailyBudgets);
        expect(dailyBudgetStore.currentDailyBudget()).toEqual(dailyBudgets[1]);
    });

    it('returns a default daily budget with a value of 0.00 and the earliest time possible', () => {
        const dailyBudgetStore = new DailyBudgetStore(_dailyBudgetsRef(), []);
        const defaultDailyBudget = new DailyBudget('default', 0.00, new Date('0000-01-01T00:00:00.000Z'));
        expect(dailyBudgetStore.currentDailyBudget()).toEqual(defaultDailyBudget);
    });
});

describe('addDailyBudget', () => {
    it('adds a new daily budget to the firebase database', () => {
        const dailyBudgetsRef = _dailyBudgetsRef();
        const dailyBudgetStore = new DailyBudgetStore(dailyBudgetsRef, []);
        const createdAt = new Date('2018-03-01T08:00:00.000Z');
        
        dailyBudgetStore.addDailyBudget(123.00, createdAt);
        expect(dailyBudgetsRef.push().set).toHaveBeenCalledWith({
            id: 'someKey',
            amount: 123,
            createdAt: '2018-03-01T08:00:00.000Z'
        });
    });
});

describe('receiveDailyBudgets', () => {
    it('replaces daily budgets with those received from the database', () => {
        const dailyBudgets = [
            new DailyBudget('id1', 11, new Date()),
            new DailyBudget('id2', 30, new Date())
        ];
        const dailyBudgetStore = new DailyBudgetStore(_dailyBudgetsRef(), []);
        dailyBudgetStore.receiveDailyBudgets(dailyBudgets);
        expect(dailyBudgetStore.dailyBudgets().slice()).toEqual(dailyBudgets);
    });
});

function _firebaseDatabase() {
    const on = jest.fn();
    return {
        ref: jest.fn(() => ({ on: on }))
    };
}

function _dailyBudgetsRef() {
    const set = jest.fn();
    return {
        push: jest.fn(() => ({
            key: 'someKey',
            set: set
        }))
    }
}

function _snapshot() {
    return {
        val: () => ({
            'id1': {
                id: 'id1',
                amount: 123,
                createdAt: new Date(2018, 2, 1),
            },
            'id2': {
                id: 'id2',
                amount: 124,
                createdAt: new Date(2018, 2, 2),
            }
        })
    };
}
