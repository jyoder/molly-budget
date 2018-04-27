import DailyBudgetSerializer from 'mollybudget/settings/model/DailyBudgetSerializer';
import DailyBudget from 'mollybudget/settings/model/DailyBudget';


describe('toJson', () => {
    it('serializes the given daily budget to JSON', () => {
        const createdAt = new Date('2018-03-05T11:24:12.000Z');
        const dailyBudget = new DailyBudget('id1', 12, createdAt);
        expect(DailyBudgetSerializer.toJson(dailyBudget)).toEqual({
            id: 'id1',
            amount: 12,
            createdAt: '2018-03-05T11:24:12.000Z'
        });
    });
});

describe('fromJson', () => {
    it('deserializes the given JSON to a daily budget', () => {
        const createdAt = new Date('2018-03-05T11:24:12.000Z');
        const dailyBudget = new DailyBudget('id1', 12, createdAt);
        expect(DailyBudgetSerializer.fromJson({
            id: 'id1',
            amount: 12,
            createdAt: '2018-03-05T11:24:12.000Z'
        })).toEqual(dailyBudget);
    });
});

describe('fromJsonList', () => {
    it('deserializes the given list of JSONs to a list of daily budgets', () => {
        const createdAt = new Date('2018-03-05T11:24:12.000Z');
        const dailyBudgets = [
            new DailyBudget('id1', 12, createdAt),
            new DailyBudget('id2', 11, createdAt)
        ];
        expect(DailyBudgetSerializer.fromJsonList(
            [
                {
                    id: 'id1',
                    amount: 12,
                    createdAt: '2018-03-05T11:24:12.000Z'
                },
                {
                    id: 'id2',
                    amount: 11,
                    createdAt: '2018-03-05T11:24:12.000Z'
                }
            ]
        )).toEqual(dailyBudgets);
    });
});
