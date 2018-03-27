import Transaction from 'state/Transaction';


export default class TransactionSerializer {
    static toJson(transaction) {
        return {
            id: transaction.id(),
            amount: transaction.amount(),
            occurredOn: transaction.occurredOn().toISOString(),
            category: transaction.category()
        };
    }

    static fromJson(json) {
        return new Transaction(
            json.id,
            json.amount,
            new Date(json.occurredOn),
            json.category
        );
    }

    static fromJsonList(jsonList) {
        return jsonList.map((json) => this.fromJson(json));
    }
}
