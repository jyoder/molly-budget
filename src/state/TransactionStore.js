import { decorate, observable } from 'mobx';
import Transaction from 'state/Transaction';
import TransactionSerializer from 'state/TransactionSerializer';


class TransactionStore {
    static create(firebaseDatabase, userId) {
        const transactionsRef = firebaseDatabase.ref(`/accounts/${userId}/transactions`);
        const transactionStore = new TransactionStore(transactionsRef, []);
        this._connect(transactionsRef, transactionStore);

        return transactionStore;
    }

    static _connect(transactionRef, transactionStore) {
        transactionRef.on('value', (snapshot) => {
            if(snapshot.val()) {
                transactionStore.receiveTransactions(
                    TransactionSerializer.fromJsonList(Object.values(snapshot.val()))
                );
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

    addTransaction(amount, occurredOn, category) {
        const ref = this._transactionsRef.push();
        const transaction = new Transaction(ref.key, amount, occurredOn, category);
        ref.set(TransactionSerializer.toJson(transaction));
    }

    receiveTransactions(transactions) {
        this._transactions = transactions;
    }
}

export default decorate(TransactionStore, {
    _transactions: observable
});
