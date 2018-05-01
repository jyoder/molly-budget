import TransactionStore from 'mollybudget/transaction/model/TransactionStore';
import Transaction from 'mollybudget/transaction/model/Transaction';


describe('create', () => {
    it('creates a new transaction store and wires up the database ref', () => {
        const firebaseDatabase = _firebaseDatabase();
        const transactionStore = TransactionStore.create(firebaseDatabase, 'john', jest.fn());
        
        expect(firebaseDatabase.ref).toHaveBeenCalledWith('/accounts/john/transactions');
        expect(firebaseDatabase.ref().on).toHaveBeenCalledTimes(1);

        firebaseDatabase.ref().on.mock.calls[0][1](_snapshot());
        const transaction1 = new Transaction('id1', 123.00, new Date(2018, 2, 1), 'Disneyland');
        const transaction2 = new Transaction('id2', 124.00, new Date(2018, 2, 2), 'Knotts');
        expect(transactionStore.transactions().slice()).toEqual([transaction1, transaction2]);
    });

    it('invokes the onInitialized callback once upon first reception of transactions', () => {
        const firebaseDatabase = _firebaseDatabase();
        const onInitialized = jest.fn();
        const transactionStore = TransactionStore.create(firebaseDatabase, 'john', onInitialized);
        
        expect(firebaseDatabase.ref).toHaveBeenCalledWith('/accounts/john/transactions');
        expect(firebaseDatabase.ref().on).toHaveBeenCalledTimes(1);

        firebaseDatabase.ref().on.mock.calls[0][1](_snapshot());
        expect(onInitialized).toHaveBeenCalledWith(transactionStore);

        firebaseDatabase.ref().on.mock.calls[0][1](_snapshot());
        expect(onInitialized).toHaveBeenCalledTimes(1);
    });

    it('handles the case where the database snapshot value is null', () => {
        const firebaseDatabase = _firebaseDatabase();
        const transactionStore = TransactionStore.create(firebaseDatabase, 'john');
        
        expect(firebaseDatabase.ref).toHaveBeenCalledWith('/accounts/john/transactions');
        expect(firebaseDatabase.ref().on).toHaveBeenCalledTimes(1);

        firebaseDatabase.ref().on.mock.calls[0][1]({ val: () => null });
        expect(transactionStore.transactions().slice()).toEqual([]);
    });
});

describe('transactions', () => {
    it('returns a list of transactions in the store', () => {
        const transactions = [
            new Transaction('id1', 11.34, new Date(), 'Disneyland'),
            new Transaction('id2', 30.12, new Date(), 'Movies')
        ];
        const transactionStore = new TransactionStore(_transactionsRef(), transactions);
        expect(transactionStore.transactions().slice()).toEqual(transactions);
    });
});

describe('addTransaction', () => {
    it('adds a new transaction to the firebase database', () => {
        const transactionsRef = _transactionsRef();
        const transactionStore = new TransactionStore(transactionsRef, []);
        const occurredAt = new Date('2018-03-01T08:00:00.000Z');
        
        transactionStore.addTransaction(123.00, occurredAt, 'Disneyland');
        expect(transactionsRef.push().set).toHaveBeenCalledWith({
            id: 'someKey',
            amount: 123.00,
            occurredAt: '2018-03-01T08:00:00.000Z',
            category: 'Disneyland'
        });
    });
});

describe('receiveTransactions', () => {
    it('replaces transactions with those received from the database', () => {
        const transactions = [
            new Transaction('id1', 11.34, new Date(), 'Disneyland'),
            new Transaction('id2', 30.12, new Date(), 'Movies')
        ];
        const transactionStore = new TransactionStore(_transactionsRef(), []);
        transactionStore.receiveTransactions(transactions);
        expect(transactionStore.transactions().slice()).toEqual(transactions);
    });
});

function _firebaseDatabase() {
    const on = jest.fn();
    return {
        ref: jest.fn(() => ({ on: on }))
    };
}

function _transactionsRef() {
    const set = jest.fn();
    return {
        push: jest.fn(() => ({
            key: 'someKey',
            set: set
        }))
    }
}

function _snapshot() {
    return {
        val: () => ({
            'id1': {
                id: 'id1',
                amount: 123.00,
                occurredAt: new Date(2018, 2, 1),
                category: 'Disneyland'
            },
            'id2': {
                id: 'id2',
                amount: 124.00,
                occurredAt: new Date(2018, 2, 2),
                category: 'Knotts'
            }
        })
    };
}
