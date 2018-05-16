import TransactionHistory from 'mollybudget/transaction/model/TransactionHistory';
import Transaction from 'mollybudget/transaction/model/Transaction';


describe('inMonthByDay', () => {
    it('returns an empty array when there are no transactions', () => {
        const date = new Date('2018-05-05T11:24:12.000Z');
        const transactionHistory = new TransactionHistory([]);
        expect(transactionHistory.inMonthByDay(date)).toEqual([]);
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
        expect(transactionsByDay[1].transactions()).toEqual([transaction3, transaction2]);
        
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
