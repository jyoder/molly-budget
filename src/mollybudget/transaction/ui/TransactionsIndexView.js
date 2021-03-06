import CategoryIconMapper from 'mollybudget/transaction/ui/CategoryIconMapper';
import Transaction from 'mollybudget/transaction/model/Transaction';

import { format } from 'date-fns';
import { formatCurrency } from 'mollybudget/format/CurrencyFormat';


export default class TransactionsIndexView {
    constructor(date, transactionHistory) {
        this._date = date;
        this._transactionHistory = transactionHistory;
    }

    transactionDayViews() {
        return this._transactionHistory.inMonthByDay(this._date).map(
            (transactionsOnDay) => new TransactionDayView(transactionsOnDay)
        );
    }
}

export class TransactionDayView {
    constructor(transactionsOnDay) {
        this._transactionsOnDay = transactionsOnDay;
    }

    dateKey() {
        return `date-${this._isoDate()}`;
    }

    date() {
        return format(this._transactionsOnDay.date(), 'dddd, MMMM D, YYYY');
    }

    transactionRowViews() {
        return this._transactionsOnDay.transactions().map(
            (transaction) => new TransactionRowView(transaction)
        );
    }

    totalKey() {
        return `total-${this._isoDate()}`;
    }

    total() {
        return `$${formatCurrency(Math.abs(this._transactionsOnDay.total()))}`;
    }

    totalClass() {
        if(this._transactionsOnDay.total() > 0.00) {
            return 'TransactionsIndexPage-total--loss';
         } else {
            return 'TransactionsIndexPage-total--gain';
         }
    }

    _isoDate() {
        return this._transactionsOnDay.date().toISOString();
    }
}

export class TransactionRowView {
    constructor(transaction) {
        this._transaction = transaction;
    }

    key() {
        return this._transaction.id();
    }

    amount() {
        return `$${formatCurrency(this._transaction.amount())}`;
    }

    amountClass() {
        if(this._transaction.type() === Transaction.EXPENSE) {
            return 'TransactionsIndexPage-amount--expense';
        } else {
            return 'TransactionsIndexPage-amount--income';
        }
    }

    category() {
        return this._transaction.category();
    }

    categoryIcon() {
        return CategoryIconMapper.toIcon(this._transaction.category());
    }

    editable() {
        return this._transaction.category() !== 'Rollover';
    }
}
