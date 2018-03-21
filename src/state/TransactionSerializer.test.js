import TransactionSerializer from 'state/TransactionSerializer';
import Transaction from 'state/Transaction';

describe('toJson', () => {
    it('serializes the given transaction to JSON', () => {
        const occurredOn = new Date(2018, 2, 5);
        const transaction = new Transaction('id1', 12.35, occurredOn, 'Narnia');
        expect(TransactionSerializer.toJson(transaction)).toEqual({
            id: 'id1',
            amount: 12.35,
            occurredOn: occurredOn,
            category: 'Narnia'
        });
    });
});

describe('fromJson', () => {
    it('deserializes the given JSON to a transaction', () => {
        const occurredOn = new Date(2018, 2, 5);
        const transaction = new Transaction('id1', 12.35, occurredOn, 'Narnia');
        expect(TransactionSerializer.fromJson({
            id: 'id1',
            amount: 12.35,
            occurredOn: occurredOn,
            category: 'Narnia'
        })).toEqual(transaction);
    });
});

describe('fromJsonList', () => {
    it('deserializes the given list of JSONs to a list of transactions', () => {
        const occurredOn = new Date(2018, 2, 5);
        const transactions = [
            new Transaction('id1', 12.35, occurredOn, 'Narnia'),
            new Transaction('id2', 11.34, occurredOn, 'Disneyland')
        ];
        expect(TransactionSerializer.fromJsonList(
            [
                {
                    id: 'id1',
                    amount: 12.35,
                    occurredOn: occurredOn,
                    category: 'Narnia'
                },
                {
                    id: 'id2',
                    amount: 11.34,
                    occurredOn: occurredOn,
                    category: 'Disneyland'
                }
            ]
        )).toEqual(transactions);
    });
});
