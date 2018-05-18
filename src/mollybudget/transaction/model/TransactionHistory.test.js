import TransactionHistory from 'mollybudget/transaction/model/TransactionHistory';
import Transaction from 'mollybudget/transaction/model/Transaction';
import Budget from 'mollybudget/budget/model/Budget';
import DailyBudget from 'mollybudget/settings/model/DailyBudget';


describe('createWithRollover', () => {
    it('uses the given budget to determine the rollover at the beginning of the month', () => {
        const date = new Date('2018-05-05T11:24:12.000Z');
        const transaction = new Transaction('tId1', 10.00, date, 'General');
        const dailyBudget = new DailyBudget('dId1', 10.00, new Date('2018-04-30T11:24:12.000Z'));
        const budget = new Budget([dailyBudget], [transaction]);
        const transactionHistory = TransactionHistory.createWithRollover(date, [transaction], budget);
        
        const transactionsByDay = transactionHistory.inMonthByDay(date);
        expect(transactionsByDay).toHaveLength(2);

        expect(transactionsByDay[0].date().getDate()).toBe(5);
        expect(transactionsByDay[0].transactions()).toHaveLength(1);
        expect(transactionsByDay[0].transactions()[0].occurredAt().getDate()).toBe(5);
        expect(transactionsByDay[0].transactions()[0].amount()).toBeCloseTo(10.00);
        expect(transactionsByDay[0].transactions()[0].category()).toBe('General');

        expect(transactionsByDay[1].date().getDate()).toBe(1);
        expect(transactionsByDay[1].transactions()).toHaveLength(1);
        expect(transactionsByDay[1].transactions()[0].occurredAt().getDate()).toBe(1);
        expect(transactionsByDay[1].transactions()[0].amount()).toBeCloseTo(10.00);
        expect(transactionsByDay[1].transactions()[0].category()).toBe('Rollover');
    });
});

describe('inMonthByDay', () => {
    it('returns an empty array when there are no transactions', () => {
        const date = new Date('2018-05-05T11:24:12.000Z');
        const transactionHistory = new TransactionHistory([]);
        expect(transactionHistory.inMonthByDay(date)).toEqual([]);
    });

    it('returns a transaction group specifying the rollover amount, if specified', () => {
        const date = new Date('2018-05-05T11:24:12.000Z');
        const transactionHistory = new TransactionHistory([], 123.12);
        
        const transactionsByDay = transactionHistory.inMonthByDay(date);
        expect(transactionsByDay).toHaveLength(1);

        expect(transactionsByDay[0].date().getDate()).toBe(1);
        expect(transactionsByDay[0].transactions()).toHaveLength(1);
        expect(transactionsByDay[0].transactions()[0].occurredAt().getDate()).toBe(1);
        expect(transactionsByDay[0].transactions()[0].amount()).toBeCloseTo(123.12);
        expect(transactionsByDay[0].transactions()[0].category()).toBe('Rollover');
    });

    it('allows the rollover amount to be coupled with other transactions on the first of the month', () => {
        const may1 = new Date('2018-05-01T11:24:12.000Z');
        const transaction = new Transaction('id1', 10.00, may1, 'General');
        const transactionHistory = new TransactionHistory([transaction], 111.10);
        
        const transactionsByDay = transactionHistory.inMonthByDay(may1);
        expect(transactionsByDay).toHaveLength(1);

        expect(transactionsByDay[0].date().getDate()).toBe(1);
        expect(transactionsByDay[0].transactions()).toHaveLength(2);
        expect(transactionsByDay[0].transactions()[0].occurredAt().getDate()).toBe(1);
        expect(transactionsByDay[0].transactions()[0].amount()).toBeCloseTo(111.10);
        expect(transactionsByDay[0].transactions()[0].category()).toBe('Rollover');

        expect(transactionsByDay[0].transactions()[1].occurredAt().getDate()).toBe(1);
        expect(transactionsByDay[0].transactions()[1].amount()).toBeCloseTo(10.00);
        expect(transactionsByDay[0].transactions()[1].category()).toBe('General');
    });

    it('inserts rollover on the first of the month even if other transactions are not on the first', () => {
        const may1 = new Date('2018-05-01T11:24:12.000Z');
        const may2 = new Date('2018-05-02T11:24:12.000Z');
        const transaction = new Transaction('id1', 10.00, may2, 'General');
        const transactionHistory = new TransactionHistory([transaction], 111.10);
        
        const transactionsByDay = transactionHistory.inMonthByDay(may1);
        expect(transactionsByDay).toHaveLength(2);

        expect(transactionsByDay[0].date().getDate()).toBe(2);
        expect(transactionsByDay[0].transactions()).toHaveLength(1);
        expect(transactionsByDay[0].transactions()[0].occurredAt().getDate()).toBe(2);
        expect(transactionsByDay[0].transactions()[0].amount()).toBeCloseTo(10.00);
        expect(transactionsByDay[0].transactions()[0].category()).toBe('General');

        expect(transactionsByDay[1].date().getDate()).toBe(1);
        expect(transactionsByDay[1].transactions()).toHaveLength(1);
        expect(transactionsByDay[1].transactions()[0].id()).toBe('rolloverId');
        expect(transactionsByDay[1].transactions()[0].occurredAt().getDate()).toBe(1);
        expect(transactionsByDay[1].transactions()[0].amount()).toBeCloseTo(111.10);
        expect(transactionsByDay[1].transactions()[0].category()).toBe('Rollover');
    });

    it('returns a single group of transactions if only one transaction exists in the given month', () => {
        const transaction = new Transaction('id1', 10.00, new Date('2018-05-05T11:24:12.000Z'), 'General');
        const transactionHistory = new TransactionHistory([transaction]);
        
        const transactionsByDay = transactionHistory.inMonthByDay(transaction.occurredAt());
        expect(transactionsByDay).toHaveLength(1);
        expect(transactionsByDay[0].date().getDate()).toBe(5);
        expect(transactionsByDay[0].transactions()).toEqual([transaction]);
    });

    it('returns separate groups of transactions for distinct days', () => {
        const transaction1 = new Transaction('id1', 10.00, new Date('2018-05-05T11:24:12.000Z'), 'General');
        const transaction2 = new Transaction('id2', 10.00, new Date('2018-05-06T11:24:12.000Z'), 'General');
        const transaction3 = new Transaction('id3', 10.00, new Date('2018-05-06T11:25:12.000Z'), 'General');
        const transaction4 = new Transaction('id4', 10.00, new Date('2018-05-07T11:24:12.000Z'), 'General');

        const transactionHistory = new TransactionHistory([
            transaction1,
            transaction2,
            transaction3,
            transaction4
        ]);
        
        const transactionsByDay = transactionHistory.inMonthByDay(transaction1.occurredAt());
        expect(transactionsByDay).toHaveLength(3);

        expect(transactionsByDay[0].date().getDate()).toBe(7);
        expect(transactionsByDay[0].transactions()).toEqual([transaction4]);

        expect(transactionsByDay[1].date().getDate()).toBe(6);
        expect(transactionsByDay[1].transactions()).toEqual([transaction2, transaction3]);
        
        expect(transactionsByDay[2].date().getDate()).toBe(5);
        expect(transactionsByDay[2].transactions()).toEqual([transaction1]);
    });

    it('excludes transactions that do not fall within the given month', () => {
        const transaction1 = new Transaction('id1', 10.00, new Date('2018-05-05T11:24:12.000Z'), 'General');
        const transaction2 = new Transaction('id2', 10.00, new Date('2018-06-06T11:24:12.000Z'), 'General');

        const transactionHistory = new TransactionHistory([
            transaction1,
            transaction2
        ]);
        
        const transactionsByDay = transactionHistory.inMonthByDay(transaction1.occurredAt());
        expect(transactionsByDay).toHaveLength(1);
        
        expect(transactionsByDay[0].date().getDate()).toBe(5);
        expect(transactionsByDay[0].transactions()).toEqual([transaction1]);
    });
});
