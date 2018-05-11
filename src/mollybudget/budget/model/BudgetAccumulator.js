import { differenceInCalendarDays } from 'date-fns';

export default class BudgetAccumulator {
    constructor(dailyBudgets) {
        this._dailyBudgets = dailyBudgets;
    }

    accumulate(date) {
        const dailyBudgets = this._withoutFutures(date, this._dailyBudgets);
        if(dailyBudgets.length === 0) {
            return 0.00;
        }

        let amount = 0.00;
        this._forEachPair(dailyBudgets, (dailyBudget1, dailyBudget2) => {
            amount += this._accumulate(dailyBudget1, dailyBudget2);
        });
        const last = this._dailyBudgets[dailyBudgets.length - 1];
        amount += this._accumulateBetween(last.createdAt(), date, last.amount());

        return amount;
    }

    _withoutFutures(date, dailyBudgets) {
        return dailyBudgets.filter((dailyBudget) => dailyBudget.createdAt() < date);
    }

    _forEachPair(array, func) {
        for(var i = 0; i < array.length - 1; i++) {
            func(array[i], array[i + 1]);
        }
    }

    _accumulate(dailyBudget1, dailyBudget2) {
        return this._accumulateBetween(
            dailyBudget1.createdAt(),
            dailyBudget2.createdAt(),
            dailyBudget1.amount()
        );
    }

    _accumulateBetween(date1, date2, dailyAmount) {
        return differenceInCalendarDays(date2, date1) * dailyAmount;
    }
}
