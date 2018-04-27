import DailyBudget from 'mollybudget/state/DailyBudget';


export default class DailyBudgetSerializer {
    static toJson(dailyBudget) {
        return {
            id: dailyBudget.id(),
            amount: dailyBudget.amount(),
            createdAt: dailyBudget.createdAt().toISOString(),
        };
    }

    static fromJson(json) {
        return new DailyBudget(
            json.id,
            json.amount,
            new Date(json.createdAt),
        );
    }

    static fromJsonList(jsonList) {
        return jsonList.map((json) => this.fromJson(json));
    }
}
