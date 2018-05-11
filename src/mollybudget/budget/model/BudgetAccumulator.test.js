import BudgetAccumulator from 'mollybudget/budget/model/BudgetAccumulator';
import DailyBudget from 'mollybudget/settings/model/DailyBudget';


describe('accumulate', () => {
    it('returns 10.00 for one day with a daily budget of 10.00', () => {
        const april1 = new Date('2018-04-01T11:00:00.000Z');
        const april2 = new Date('2018-04-02T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([new DailyBudget('id1', 10.00, april1)]);
        expect(accumulator.accumulate(april2)).toBeCloseTo(10.00);
    });

    it('returns 20.00 for two days with a daily budget of 10.00', () => {
        const april1 = new Date('2018-04-01T11:00:00.000Z');
        const april3 = new Date('2018-04-03T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([new DailyBudget('id1', 10.00, april1)]);
        expect(accumulator.accumulate(april3)).toBeCloseTo(20.00);
    });

    it('returns 40.00 for two days with a daily budget of 20.00', () => {
        const april1 = new Date('2018-04-01T11:00:00.000Z');
        const april3 = new Date('2018-04-03T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([new DailyBudget('id1', 20.00, april1)]);
        expect(accumulator.accumulate(april3)).toBeCloseTo(40.00);
    });

    it('returns 50.00 for two days with a daily budget of 20.00 and one day with a daily budget of 10.00', () => {
        const april1 = new Date('2018-04-01T11:00:00.000Z');
        const april3 = new Date('2018-04-03T11:00:00.000Z');
        const april4 = new Date('2018-04-04T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id1', 20.00, april1),
            new DailyBudget('id2', 10.00, april3)
        ]);
        expect(accumulator.accumulate(april4)).toBeCloseTo(50.00);
    });

    it('ignores obsolete daily budgets created within the same day', () => {
        const april1 = new Date('2018-04-01T11:00:00.000Z');
        const april2 = new Date('2018-04-02T11:00:00.000Z');
        const april3 = new Date('2018-04-03T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id1', 20.00, april1),
            new DailyBudget('id2', 1000.00, april2),
            new DailyBudget('id3', 2000.00, april2),
            new DailyBudget('id4', 37.00, april2)
        ]);
        expect(accumulator.accumulate(april3)).toBeCloseTo(57.00);
    });

    it('ensures that daily budget changes do not take effect on the current day', () => {
        const april1 = new Date('2018-04-01T11:00:00.000Z');
        const april2 = new Date('2018-04-02T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id1', 20.00, april1),
            new DailyBudget('id2', 1000.00, april2),
        ]);
        expect(accumulator.accumulate(april2)).toBeCloseTo(20.00);
    });

    it('ignores future daily budgets', () => {
        const april1 = new Date('2018-04-01T11:00:00.000Z');
        const april2 = new Date('2018-04-02T11:00:00.000Z');
        const april3 = new Date('2018-04-03T11:00:00.000Z');
        const april4 = new Date('2018-04-04T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id1', 20.00, april1),
            new DailyBudget('id2', 10.00, april2),
            new DailyBudget('id3', 2000.00, april4)
        ]);
        expect(accumulator.accumulate(april3)).toBeCloseTo(30.00);
    });

    it('returns 0.00 if no daily budget has been configured', () => {
        const april2 = new Date('2018-04-02T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([]);
        expect(accumulator.accumulate(april2)).toBeCloseTo(0.00);
    });

    it('returns 0.00 if only future daily budgets exist', () => {
        const april5 = new Date('2018-04-05T11:00:00.000Z');
        const april20 = new Date('2018-04-20T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id3', 3000.00, april20)
        ]);
        expect(accumulator.accumulate(april5)).toBeCloseTo(0.00);
    });

    it('accumulates the budget across month boundaries', () => {
        const march30 = new Date('2018-03-30T00:00:00.000Z');
        const april2 = new Date('2018-04-02T00:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id1', 3000.00, march30)
        ]);
        expect(accumulator.accumulate(april2)).toBeCloseTo(9000.00);
    });

    it('uses the latest daily budget if no daily budgets have been added in the current month', () => {
        const march14 = new Date('2018-03-14T08:00:00.000Z');
        const march15 = new Date('2018-03-15T10:00:00.000Z');
        const april2 = new Date('2018-04-02T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id1', 3000.00, march14),
            new DailyBudget('id2', 4000.00, march15)
        ]);
        expect(accumulator.accumulate(april2)).toBeCloseTo(75000.00);
    });

    it('rolls over daily budget from a previous month and adjusts to updates in the current month', () => {
        const march15 = new Date('2018-03-15T11:00:00.000Z');
        const april2 = new Date('2018-04-02T11:00:00.000Z');
        const april5 = new Date('2018-04-05T11:00:00.000Z');
        const april20 = new Date('2018-04-20T11:00:00.000Z');
        const accumulator = new BudgetAccumulator([
            new DailyBudget('id1', 50.00, march15),
            new DailyBudget('id2', 20.00, april2),
            new DailyBudget('id3', 3000.00, april20)
        ]);
        expect(accumulator.accumulate(april5)).toBeCloseTo(960.00);
    });
});
