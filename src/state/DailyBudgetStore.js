import { decorate, observable, action } from 'mobx';
import DailyBudget from 'state/DailyBudget';
import DailyBudgetSerializer from 'state/DailyBudgetSerializer';


const DEFAULT_DAILY_BUDGET = new DailyBudget('default', 0.00, new Date('0000-01-01T00:00:00.000Z'));

class DailyBudgetStore {
    static create(firebaseDatabase, userId, onInitialized) {
        const dailyBudgetsRef = firebaseDatabase.ref(`/accounts/${userId}/dailyBudgets`);
        const dailyBudgetStore = new DailyBudgetStore(dailyBudgetsRef, []);
        this._initialize(dailyBudgetsRef, dailyBudgetStore, onInitialized);

        return dailyBudgetStore;
    }

    static _initialize(dailyBudgetRef, dailyBudgetStore, onInitialized) {
        dailyBudgetRef.on('value', (snapshot) => {
            if(snapshot.val()) {
                dailyBudgetStore.receiveDailyBudgets(
                    DailyBudgetSerializer.fromJsonList(Object.values(snapshot.val()))
                );
            }
            if(onInitialized) {
                onInitialized(dailyBudgetStore);
                onInitialized = null;
            }
        });
    }

    constructor(dailyBudgetsRef, dailyBudgets) {
        this._dailyBudgetsRef = dailyBudgetsRef;
        this._dailyBudgets = dailyBudgets;
    }

    dailyBudgets() {
        return this._dailyBudgets.slice();
    }

    currentDailyBudget() {
        if(this._dailyBudgets.length > 0) {
            return this._dailyBudgets[this._dailyBudgets.length - 1];
        } else {
            return DEFAULT_DAILY_BUDGET;
        }
    }

    addDailyBudget(amount, createdAt, category) {
        const ref = this._dailyBudgetsRef.push();
        const dailyBudget = new DailyBudget(ref.key, amount, createdAt, category);
        ref.set(DailyBudgetSerializer.toJson(dailyBudget));
    }

    receiveDailyBudgets(dailyBudgets) {
        this._dailyBudgets.replace(dailyBudgets);
    }
}

export default decorate(DailyBudgetStore, {
    _dailyBudgets: observable,
    receiveDailyBudgets: action
});
