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

describe('occurredOn', () => {
    it('returns the date the transaction occurred on', () => {
        const occurredOn = new Date(2018, 2, 5);
        const transaction = new Transaction('id', 12.3, occurredOn, 'Disneyland');
        expect(transaction.occurredOn()).toBe(occurredOn);
    });
});

describe('category', () => {
    it('returns the transaction category', () => {
        const transaction = new Transaction('id', 12.3, new Date(), 'Disneyland');
        expect(transaction.category()).toBe('Disneyland');
    });
});
