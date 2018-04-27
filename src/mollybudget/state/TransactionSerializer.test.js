import TransactionSerializer from 'state/TransactionSerializer';
import Transaction from 'state/Transaction';


describe('toJson', () => {
    it('serializes the given transaction to JSON', () => {
        const occurredAt = new Date('2018-03-05T11:24:12.000Z');
        const transaction = new Transaction('id1', 12.35, occurredAt, 'Narnia');
        expect(TransactionSerializer.toJson(transaction)).toEqual({
            id: 'id1',
            amount: 12.35,
            occurredAt: '2018-03-05T11:24:12.000Z',
            category: 'Narnia'
        });
    });
});

describe('fromJson', () => {
    it('deserializes the given JSON to a transaction', () => {
        const occurredAt = new Date('2018-03-05T11:24:12.000Z');
        const transaction = new Transaction('id1', 12.35, occurredAt, 'Narnia');
        expect(TransactionSerializer.fromJson({
            id: 'id1',
            amount: 12.35,
            occurredAt: '2018-03-05T11:24:12.000Z',
            category: 'Narnia'
        })).toEqual(transaction);
    });
});

describe('fromJsonList', () => {
    it('deserializes the given list of JSONs to a list of transactions', () => {
        const occurredAt = new Date('2018-03-05T11:24:12.000Z');
        const transactions = [
            new Transaction('id1', 12.35, occurredAt, 'Narnia'),
            new Transaction('id2', 11.34, occurredAt, 'Disneyland')
        ];
        expect(TransactionSerializer.fromJsonList(
            [
                {
                    id: 'id1',
                    amount: 12.35,
                    occurredAt: '2018-03-05T11:24:12.000Z',
                    category: 'Narnia'
                },
                {
                    id: 'id2',
                    amount: 11.34,
                    occurredAt: '2018-03-05T11:24:12.000Z',
                    category: 'Disneyland'
                }
            ]
        )).toEqual(transactions);
    });
});
