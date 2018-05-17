import Budget from 'mollybudget/budget/model/Budget';
import DailyBudget from 'mollybudget/settings/model/DailyBudget';
import Transaction from 'mollybudget/transaction/model/Transaction';


describe('totalToDate', () => {
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

        const budget = new Budget(dailyBudgets, transactions);
        expect(budget.totalToDate(today)).toBeCloseTo(19.00);
    });

    it('includes transactions from a previous month', () => {
        const today = new Date('2018-04-02T11:00:00.000Z');
        
        const dailyBudgets = [
            new DailyBudget('id1', 40.00, new Date('2018-01-01T11:00:00.000Z'))
        ];
        const transactions = [
            new Transaction('id1', 10.00, new Date('2018-01-01T11:00:00.000Z'), 'Disneyland'),
            new Transaction('id2', 15.00, new Date('2018-01-31T11:00:00.000Z'), 'Knotts')
        ];

        const budget = new Budget(dailyBudgets, transactions);
        expect(budget.totalToDate(today)).toBeCloseTo(3615.00);
    });

    it('excludes transactions in the future', () => {
        const today = new Date('2018-04-02T11:00:00.000Z');
        const transactions = [
            new Transaction('id1', 10.00, new Date('2018-04-01T11:00:00.000Z'), 'Disneyland'),
            new Transaction('id2', 15.00, new Date('2018-04-03T11:00:00.000Z'), 'Knotts')
        ];

        const budget = new Budget([], transactions);
        expect(budget.totalToDate(today)).toBeCloseTo(-10.00);
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

        const budget = new Budget(dailyBudgets, transactions);
        expect(budget.totalToDate(today)).toBeCloseTo(9675.00);
    });
});
