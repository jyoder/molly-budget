import TransactionsOnDay from 'mollybudget/transaction/model/TransactionsOnDay';
import { startOfMonth } from 'date-fns';


export default class TransactionHistory {
    constructor(transactions) {
        this._transactions = transactions;
    }

    inMonthByDay(date) {
        return this._transactionGroups(this._transactions, date).map(
            (group) => (new TransactionsOnDay(group[0].occurredAt(), group))
        );
    }

    _transactionGroups(transactions, date) {
        return this._byDay(this._newestFirst(this._inMonth(date.getMonth(), this._transactions)));
    }

    _inMonth(month, transactions) {
        return transactions.filter((transaction) => transaction.occurredAt().getMonth() === month);
    }

    _newestFirst(transactions) {
        return Array.from(transactions).sort((t1, t2) => t2.occurredAt() - t1.occurredAt());
    }

    _byDay(transactions) {
        const groups = new Map();
        transactions.forEach((transaction) => {
            const date = new Date(transaction.occurredAt());
            date.setHours(0, 0, 0);
            const key = date.toString();
            
            let group = groups.get(key);
            if(group === undefined) {
                group = [];
                groups.set(key, group);
            }
            group.push(transaction);
        });
        return Array.from(groups.values());
    }
}
