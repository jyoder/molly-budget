import TransactionsOnDay from 'ui/transaction/TransactionsOnDay';
import Transaction from 'state/Transaction';


describe('date', () => {
    it('returns the date on which the transactions occurred', () => {
        const date = new Date('2018-03-05T11:24:12.000Z');
        const transactionsOnDay = new TransactionsOnDay(date, []);
        expect(transactionsOnDay.date()).toBe(date);
    });
});

describe('transactions', () => {
    it('returns the transactions', () => {
        const transaction1 = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
        const transaction2 = new Transaction('id2', 40.00, new Date('2018-03-05T11:00:00.000Z'), 'General');
        const transactionsOnDay = new TransactionsOnDay(
            transaction1.occurredAt(),
            [transaction1, transaction2]);

        expect(transactionsOnDay.transactions()).toEqual([transaction1, transaction2]);
    });
});

describe('total', () => {
    it('returns the sum of all transaction amounts for the day', () => {
        const transaction1 = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
        const transaction2 = new Transaction('id2', 40.00, new Date('2018-03-05T11:00:00.000Z'), 'General');
        const transactionsOnDay = new TransactionsOnDay(
            transaction1.occurredAt(),
            [transaction1, transaction2]);

        expect(transactionsOnDay.total()).toBeCloseTo(60.00);
    });
});
