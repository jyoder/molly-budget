import Budget from 'mollybudget/budget/model/Budget';
import DailyBudget from 'mollybudget/settings/model/DailyBudget';
import Transaction from 'mollybudget/state/Transaction';


describe('create', () => {
    it('returns a budget configured with the current date', () => {
        const savedDate = Date;
        const today = new Date('2018-04-05T11:00:00.000Z');

        const dailyBudgets = [
            new DailyBudget('id1', 8.00, new Date('2018-04-01T11:00:00.000Z'))
        ];
        const transactions = [
            new Transaction('id1', 10.00, new Date('2018-04-02T11:00:00.000Z'), 'Disneyland')
        ];
        
        // Mock the date constructor and restore it after creating a budget
        Date = jest.fn(() => today);
        const budget = Budget.create(dailyBudgets, transactions);
        Date = savedDate;

        expect(budget.current()).toBeCloseTo(22.00);
    });
});

describe('current', () => {
    it('returns the amount accrued or received as income minus the amount spent', () => {
        const today = new Date('2018-04-02T11:00:00.000Z');;
        
        const dailyBudgets = [
            new DailyBudget('id1', 40.00, new Date('2018-04-01T11:00:00.000Z'))
        ];
        const transactions = [
            new Transaction('id1', 10.00, new Date('2018-04-01T11:00:00.000Z'), 'General'),
            new Transaction('id2', 15.00, new Date('2018-04-02T11:00:00.000Z'), 'Car'),
            new Transaction('id2', 4.00, new Date('2018-04-02T11:00:00.000Z'), 'Income')
        ];

        const budget = new Budget(today, dailyBudgets, transactions);
        expect(budget.current()).toBeCloseTo(19.00);
    });

    it('ignores transactions from a previous month', () => {
        const today = new Date('2018-04-02T11:00:00.000Z');;
        
        const dailyBudgets = [
            new DailyBudget('id1', 40.00, new Date('2018-01-01T11:00:00.000Z'))
        ];
        const transactions = [
            new Transaction('id1', 10.00, new Date('2018-01-01T11:00:00.000Z'), 'Disneyland'),
            new Transaction('id2', 15.00, new Date('2018-04-02T11:00:00.000Z'), 'Knotts')
        ];

        const budget = new Budget(today, dailyBudgets, transactions);
        expect(budget.current()).toBeCloseTo(65.00);
    });

    it('adjusts accrual rate over the course of a month based on daily budget updates', () => {
        const today = new Date('2018-04-07T11:00:00.000Z');;
        
        const dailyBudgets = [
            new DailyBudget('id1', 40.00, new Date('2018-01-01T11:00:00.000Z')),
            new DailyBudget('id2', 10.00, new Date('2018-04-03T11:00:00.000Z')),
            new DailyBudget('id3', 3000.00, new Date('2018-04-05T11:00:00.000Z'))
        ];
        const transactions = [
            new Transaction('id1', 10.00, new Date('2018-04-02T11:00:00.000Z'), 'Disneyland'),
            new Transaction('id2', 15.00, new Date('2018-04-03T11:00:00.000Z'), 'Knotts')
        ];

        const budget = new Budget(today, dailyBudgets, transactions);
        expect(budget.current()).toBeCloseTo(6115.00);
    });

});
