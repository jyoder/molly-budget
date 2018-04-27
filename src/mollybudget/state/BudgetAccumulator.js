export default class BudgetAccumulator {
    constructor(dailyBudgets) {
        this._dailyBudgets = dailyBudgets;
    }

    monthToDate(date) {
        if(this._dailyBudgets.length === 0) {
            return 0.00;
        }
        
        const dailyBudgets = this._dailyBudgets.slice();
        const startDate = this._dailyBudgets[0].createdAt();
        
        let amount = 0.00;
        let dailyBudget = null;
        this._forEachDateBetween(startDate, date, (currDate) => {
            while(dailyBudgets.length > 0 && this._afterDay(currDate, dailyBudgets[0].createdAt())) {
                dailyBudget = dailyBudgets.shift();
            }
            if(dailyBudget !== null && this._sameMonth(currDate, date)) {
                amount += dailyBudget.amount();
            }
        });
        return amount;
    }

    _forEachDateBetween(start, end, func) {        
        let curr = new Date(start);
        while(curr < end || this._sameDay(curr, end)) {
            func(curr);
            curr.setDate(curr.getDate() + 1);
        }
    }

    _afterDay(date1, date2) {
        return !this._sameDay(date1, date2) && date1 > date2;
    }

    _sameDay(date1, date2) {
        return(
            this._sameMonth(date1, date2) &&
            date1.getDate() === date2.getDate()
        );
    }

    _sameMonth(date1, date2) {
        return(
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth()
        );
    }
}
