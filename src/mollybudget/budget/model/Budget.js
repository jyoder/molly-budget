import BudgetAccumulator from 'mollybudget/budget/model/BudgetAccumulator';
import Transaction from 'mollybudget/transaction/model/Transaction';


export default class Budget {
    constructor(date, dailyBudgets, transactions) {
        this._date = date;
        this._dailyBudgets = dailyBudgets;
        this._transactions = transactions;
    }

    current() {
        return this._amountAccrued() - this._amountSpent();
    }

    _amountAccrued() {
        return (new BudgetAccumulator(this._dailyBudgets)).accumulate(this._date);
    }

    _amountSpent() {
        return Transaction.totalExpenses(this._transactions);
    }
}
