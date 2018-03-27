import Transaction from 'state/Transaction';


describe('id', () => {
    it('returns the transaction id', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Disneyland');
        expect(transaction.id()).toBe('id');
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
