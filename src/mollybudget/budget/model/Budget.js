import BudgetAccumulator from 'mollybudget/budget/model/BudgetAccumulator';
import Transaction from 'mollybudget/transaction/model/Transaction';


export default class Budget {
    constructor(dailyBudgets, transactions) {
        this._dailyBudgets = dailyBudgets;
        this._transactions = transactions;
    }

    totalToDate(date) {
        return this._amountAccrued(date) - this._amountSpent();
    }

    _amountAccrued(date) {
        return (new BudgetAccumulator(this._dailyBudgets)).accumulate(date);
    }

    _amountSpent() {
        return Transaction.totalExpenses(this._transactions);
    }
}
