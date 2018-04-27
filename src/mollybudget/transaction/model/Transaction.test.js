import Transaction from 'mollybudget/transaction/model/Transaction';


describe('totalExpenses', () => {
    it('returns the sum of expenses', () => {
        const expense1 = new Transaction('id', 12.00, new Date(), 'General');
        const expense2 = new Transaction('id', 3.00, new Date(), 'General');
        expect(Transaction.totalExpenses([expense1, expense2])).toBeCloseTo(15.00);
    });

    it('subtracts income from the expenses', () => {
        const expense = new Transaction('id', 12.00, new Date(), 'General');
        const income = new Transaction('id', 3.00, new Date(), 'Income');
        expect(Transaction.totalExpenses([expense, income])).toBeCloseTo(9.00);
    });
});

describe('id', () => {
    it('returns the transaction id', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Disneyland');
        expect(transaction.id()).toBe('id');
    });
});

describe('type', () => {
    it('returns the income type for a transaction with "Income" category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Income');
        expect(transaction.type()).toBe(Transaction.INCOME);
    });

    it('returns the expense type for a transaction with "General" category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'General');
        expect(transaction.type()).toBe(Transaction.EXPENSE);
    });

    it('returns the expense type for a transaction with "Outing" category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Outing');
        expect(transaction.type()).toBe(Transaction.EXPENSE);
    });

    it('returns the expense type for a transaction with "Car" category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Car');
        expect(transaction.type()).toBe(Transaction.EXPENSE);
    });

    it('returns the expense type for a transaction with "Groceries" category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Groceries');
        expect(transaction.type()).toBe(Transaction.EXPENSE);
    });

    it('returns the expense type for a transaction with an unknown category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Disneyland');
        expect(transaction.type()).toBe(Transaction.EXPENSE);
    });
});

describe('amount', () => {
    it('returns the transaction amount', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Disneyland');
        expect(transaction.amount()).toBeCloseTo(12.3);
    });
});

describe('occurredAt', () => {
    it('returns the date and time the transaction occurred at', () => {
        const occurredAt = new Date(2018, 2, 5);
        const transaction = new Transaction('id', 12.3, occurredAt, 'Disneyland');
        expect(transaction.occurredAt()).toBe(occurredAt);
    });
});

describe('category', () => {
    it('returns the transaction category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Disneyland');
        expect(transaction.category()).toBe('Disneyland');
    });
});
