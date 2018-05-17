import BudgetAccumulator from 'mollybudget/budget/model/BudgetAccumulator';
import Transaction from 'mollybudget/transaction/model/Transaction';


export default class Budget {
    constructor(dailyBudgets, transactions) {
        this._dailyBudgets = dailyBudgets;
        this._transactions = transactions;
    }

    totalToDate(date) {
        return this._amountAccrued(date) - this._amountSpent(date);
    }

    _amountAccrued(date) {
        return (new BudgetAccumulator(this._dailyBudgets)).accumulate(date);
    }

    _amountSpent(date) {
        return Transaction.totalExpenses(this._withoutFutures(date, this._transactions));
    }

    _withoutFutures(date, transactions) {
        return transactions.filter((transaction) => transaction.occurredAt() <= date);
    }
}
