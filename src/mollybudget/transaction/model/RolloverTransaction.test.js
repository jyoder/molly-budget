import RolloverTransaction from 'mollybudget/transaction/model/RolloverTransaction';
import Transaction from 'mollybudget/transaction/model/Transaction';



describe('id', () => {
    it('returns the transaction id', () => {
        const transaction = new RolloverTransaction('id', 12.3, new Date());
        expect(transaction.id()).toBe('id');
    });
});

describe('type', () => {
    it('returns the income type for a transaction with a zero amount', () => {
        const transaction = new RolloverTransaction('id', 0.00, new Date());
        expect(transaction.type()).toBe(Transaction.INCOME);
    });

    it('returns the income type for a transaction with a positive amount', () => {
        const transaction = new RolloverTransaction('id', 1.00, new Date());
        expect(transaction.type()).toBe(Transaction.INCOME);
    });

    it('returns the expense type for a transaction with a negative amount', () => {
        const transaction = new RolloverTransaction('id', -1.00, new Date());
        expect(transaction.type()).toBe(Transaction.EXPENSE);
    });
});

describe('amount', () => {
    it('returns the transaction amount as an absolute value', () => {
        const transaction = new RolloverTransaction('id', -12.3, new Date());
        expect(transaction.amount()).toBeCloseTo(12.3);
    });
});

describe('occurredAt', () => {
    it('returns the date and time the transaction occurred at', () => {
        const occurredAt = new Date('2018-04-30T11:24:12.000Z');
        const transaction = new RolloverTransaction('id', 12.3, occurredAt);
        expect(transaction.occurredAt()).toBe(occurredAt);
    });
});

describe('category', () => {
    it('returns "Rollover"', () => {
        const transaction = new RolloverTransaction('id', 12.3, new Date());
        expect(transaction.category()).toBe('Rollover');
    });
});
