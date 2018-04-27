import DailyBudget from 'mollybudget/state/DailyBudget';


describe('id', () => {
    it('returns the daily budget id', () => {
        const dailyBudget = new DailyBudget('id', 12, new Date());
        expect(dailyBudget.id()).toBe('id');
    });
});

describe('amount', () => {
    it('returns the daily budget amount', () => {
        const dailyBudget = new DailyBudget('id', 12, new Date());
        expect(dailyBudget.amount()).toBeCloseTo(12);
    });
});

describe('createdAt', () => {
    it('returns the date and time the dailyBudget occurred at', () => {
        const createdAt = new Date(2018, 2, 5);
        const dailyBudget = new DailyBudget('id', 12, createdAt);
        expect(dailyBudget.createdAt()).toBe(createdAt);
    });
});
