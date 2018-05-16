import TransactionsOnDay from 'mollybudget/transaction/model/TransactionsOnDay';
import { startOfMonth } from 'date-fns';
import Transaction from './Transaction';


export default class TransactionHistory {
    constructor(transactions, rolloverAmount = null) {
        this._transactions = transactions;
        this._rolloverAmount = rolloverAmount
    }

    inMonthByDay(date) {
        return this._transactionGroups(this._transactions, date).map(
            (group) => (new TransactionsOnDay(group[0].occurredAt(), group))
        );
    }

    _transactionGroups(transactions, date) {
        const ordered = this._newestFirst(this._inMonth(date.getMonth(), this._transactions));
        if(this._rolloverAmount !== null) {
            return this._byDay(this._withRollover(ordered, this._rolloverAmount, date));
        } else {
            return this._byDay(ordered);
        }
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

    _withRollover(transactions, amount, date) {
        return [this._rolloverTransaction(amount, date), ...transactions];
    }

    _rolloverTransaction(amount, date) {
        return new Transaction(
            'rolloverId',
            amount,
            startOfMonth(date),
            'Rollover'
        );
    }
}
