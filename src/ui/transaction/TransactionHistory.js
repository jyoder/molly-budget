import TransactionsOnDay from 'ui/transaction/TransactionsOnDay';


export default class TransactionHistory {
    constructor(transactions) {
        this._transactions = transactions;
    }

    inMonthByDay(month) {
        return this._byDay(this._newestFirst(this._inMonth(month, this._transactions))).map(
            (group) => (new TransactionsOnDay(group[0].occurredAt(), group)
        ));
    }

    _inMonth(month, transactions) {
        return transactions.filter((transaction) => transaction.occurredAt().getMonth() === month);
    }

    _newestFirst(transactions) {
        return Array.from(transactions).sort((t1, t2) => t2.occurredAt() - t1.occurredAt());
    }

    _byDay(transactions) {
        const groups = new Map();
        transactions.forEach((transaction) => {
            const date = new Date(transaction.occurredAt());
            date.setHours(0, 0, 0);
            const key = date.toString();
            
            let group = groups.get(key);
            if(group === undefined) {
                group = [];
                groups.set(key, group);
            }
            group.push(transaction);
        });
        return Array.from(groups.values());
    }
}
