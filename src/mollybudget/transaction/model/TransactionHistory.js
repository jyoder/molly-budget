import TransactionsOnDay from 'mollybudget/transaction/model/TransactionsOnDay';
import RolloverTransaction from 'mollybudget/transaction/model/RolloverTransaction';
import { startOfMonth, isSameMonth } from 'date-fns';


export default class TransactionHistory {
    static createWithRollover(asOfDate, transactions, budget) {
        return new TransactionHistory(
            transactions,
            () => budget.totalToDate(startOfMonth(asOfDate))
        );
    }

    constructor(transactions, rolloverAmountFunc = null) {
        this._transactions = transactions;
        this._rolloverAmountFunc = rolloverAmountFunc
    }

    inMonthByDay(date) {
        return this._transactionGroups(this._transactions, date).map(
            (group) => this._transactionsByDay(group)
        );
    }

    _transactionGroups(transactions, date) {
        return(
            this._newestFirst(
                this._byDay(
                    this._inMonth(
                        date,
                        this._withRollover(
                            this._transactions,
                            date
                        )
                    )
                )
            )
        );
    }

    _newestFirst(transactionGroups) {
        return Array.from(transactionGroups).sort(
            (t1, t2) => t2[0].occurredAt() - t1[0].occurredAt()
        );
    }

    _inMonth(date, transactions) {
        return transactions.filter(
            (transaction) => isSameMonth(date, transaction.occurredAt())
        );
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

    _withRollover(transactions, date) {
        if(this._rolloverAmountFunc !== null) {
            const rollover = this._rolloverTransaction(
                this._rolloverAmountFunc(),
                date
            );
            return [rollover, ...transactions];
        } else {
            return transactions;
        }
    }

    _rolloverTransaction(amount, date) {
        return new RolloverTransaction(
            'rolloverId',
            amount,
            startOfMonth(date)
        );
    }

    _transactionsByDay(transactionGroup) {
        return new TransactionsOnDay(
            transactionGroup[0].occurredAt(),
            this._oldestFirst(transactionGroup)
        );
    }

    _oldestFirst(transactions) {
        return Array.from(transactions).sort(
            (t1, t2) => t1.occurredAt() - t2.occurredAt()
        );
    }
}
