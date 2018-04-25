import CategoryIconMapper from 'ui/transaction/CategoryIconMapper';

import { format } from 'date-fns';
import { formatCurrency } from 'ui/format/CurrencyFormat';


export default class TransactionsIndexView {
    constructor(month, transactionHistory) {
        this._month = month;
        this._transactionHistory = transactionHistory;
    }

    transactionDayViews() {
        return this._transactionHistory.inMonthByDay(this._month).map(
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
        return `$${formatCurrency(this._transactionsOnDay.total())}`;
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

    category() {
        return this._transaction.category();
    }

    categoryIcon() {
        return CategoryIconMapper.toIcon(this._transaction.category());
    }
}
