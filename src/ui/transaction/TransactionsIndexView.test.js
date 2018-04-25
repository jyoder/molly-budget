import TransactionsIndexView from 'ui/transaction/TransactionsIndexView';
import { TransactionDayView, TransactionRowView } from 'ui/transaction/TransactionsIndexView';
import TransactionHistory from 'ui/transaction/TransactionHistory';
import TransactionsOnDay from 'ui/transaction/TransactionsOnDay';
import Transaction from 'state/Transaction';


describe('TransactionsIndexView', () => {
    describe('dayViews', () => {
        it('returns the list of day views', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const transactionHistory = new TransactionHistory([transaction]);
            const transactionsIndexView = new TransactionsIndexView(
                transaction.occurredAt().getMonth(),
                transactionHistory
            );
            
            const dayViews = transactionsIndexView.transactionDayViews();
            expect(dayViews).toHaveLength(1);
            expect(dayViews[0].date()).toBe('Monday, March 5, 2018');
        });
    });
});

describe('TransactionDayView', () => {
    describe('date', () => {
        it('returns a formatted date on which the associated transactions occurred', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const dayView = new TransactionDayView(
                new TransactionsOnDay(transaction.occurredAt(), [transaction])
            );
            expect(dayView.date()).toBe('Monday, March 5, 2018');
        });
    });

    describe('dateKey', () => {
        it('returns a unique key for the date row', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const dayView = new TransactionDayView(
                new TransactionsOnDay(transaction.occurredAt(), [transaction])
            );
            expect(dayView.dateKey()).toBe('date-2018-03-05T11:24:12.000Z');
        });
    });

    describe('totalKey', () => {
        it('returns a unique key for the total row', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const dayView = new TransactionDayView(
                new TransactionsOnDay(transaction.occurredAt(), [transaction])
            );
            expect(dayView.totalKey()).toBe('total-2018-03-05T11:24:12.000Z');
        });
    });

    describe('transactionRowViews', () => {
        it('returns the list of TransactionRowViews', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const dayView = new TransactionDayView(
                new TransactionsOnDay(transaction.occurredAt(), [transaction])
            );
            expect(dayView.transactionRowViews()).toHaveLength(1);
            expect(dayView.transactionRowViews()[0].amount()).toBe('$20.00');
        });
    });

    describe('total', () => {
        it('returns the formatted total amount spent for the day', () => {
            const transaction1 = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const transaction2 = new Transaction('id2', 30.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            
            const dayView = new TransactionDayView(
                new TransactionsOnDay(
                    transaction1.occurredAt(),
                    [transaction1, transaction2]
                )
            );

            expect(dayView.total()).toBe('$50.00');
        });
    });
});

describe('TransactionRowView', () => {
    describe('key', () => {
        it('returns the id of the underlying transaction', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const rowView = new TransactionRowView(transaction);
            expect(rowView.key()).toBe(transaction.id());
        });
    });

    describe('amount', () => {
        it('returns the formatted amount of the transaction', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const rowView = new TransactionRowView(transaction);
            expect(rowView.amount()).toBe('$20.00');
        });
    });

    describe('category', () => {
        it('returns the category of the transaction', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const rowView = new TransactionRowView(transaction);
            expect(rowView.category()).toBe('General');
        });
    });

    describe('categoryIcon', () => {
        it('returns the name of the icon corresponding to the category', () => {
            const transaction = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
            const rowView = new TransactionRowView(transaction);
            expect(rowView.categoryIcon()).toBe('dollar');
        });
    });
});
