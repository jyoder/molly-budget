import { decorate, observable, action } from 'mobx';
import Transaction from 'state/Transaction';
import TransactionSerializer from 'state/TransactionSerializer';


class TransactionStore {
    static create(firebaseDatabase, userId, onInitialized) {
        const transactionsRef = firebaseDatabase.ref(`/accounts/${userId}/transactions`);
        const transactionStore = new TransactionStore(transactionsRef, []);
        this._initialize(transactionsRef, transactionStore, onInitialized);

        return transactionStore;
    }

    static _initialize(transactionRef, transactionStore, onInitialized) {
        transactionRef.on('value', (snapshot) => {
            if(snapshot.val()) {
                transactionStore.receiveTransactions(
                    TransactionSerializer.fromJsonList(Object.values(snapshot.val()))
                );
            }
            if(onInitialized) {
                onInitialized(transactionStore);
                onInitialized = null;
            }
        });
    }

    constructor(transactionsRef, transactions) {
        this._transactionsRef = transactionsRef;
        this._transactions = transactions;
    }

    transactions() {
        return this._transactions.slice();
    }

    addTransaction(amount, occurredAt, category) {
        const ref = this._transactionsRef.push();
        const transaction = new Transaction(ref.key, amount, occurredAt, category);
        ref.set(TransactionSerializer.toJson(transaction));
    }

    receiveTransactions(transactions) {
        this._transactions.replace(transactions);
    }
}

export default decorate(TransactionStore, {
    _transactions: observable,
    receiveTransactions: action
});
