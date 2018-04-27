import BudgetAccumulator from 'mollybudget/state/BudgetAccumulator';
import Transaction from 'mollybudget/state/Transaction';


export default class Budget {
    static create(dailyBudgets, transactions) {
        return new Budget(new Date(), dailyBudgets, transactions);
    }

    constructor(date, dailyBudgets, transactions) {
        this._date = date;
        this._dailyBudgets = dailyBudgets;
        this._transactions = transactions;
    }

    current() {
        return this._amountAccrued() - this._amountSpent();
    }

    _amountAccrued() {
        return (new BudgetAccumulator(this._dailyBudgets)).monthToDate(this._date);
    }

    _amountSpent() {
        return Transaction.totalExpenses(this._transactionsThisMonth());
    }

    _transactionsThisMonth() {
        return this._transactions.filter((transaction) => this._occurredThisMonth(transaction));
    }

    _occurredThisMonth(transaction) {
        return this._date.getMonth() === transaction.occurredAt().getMonth();
    }
}
