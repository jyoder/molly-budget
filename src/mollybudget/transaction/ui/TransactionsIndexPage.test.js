import React from 'react';
import { shallow } from 'enzyme';

import TransactionsIndexPage from 'mollybudget/transaction/ui/TransactionsIndexPage';
import TransactionsIndexView from 'mollybudget/transaction/ui/TransactionsIndexView';
import TransactionHistory from 'mollybudget/transaction/model/TransactionHistory';
import Transaction from 'mollybudget/transaction/model/Transaction';

import FontAwesome from 'react-fontawesome';


describe('TransactionsIndexPage', () => {
    it('renders transactions by day in order of newest to oldest', () => {
        const transaction1 = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
        const transaction2 = new Transaction('id2', 30.00, new Date('2018-03-06T11:24:12.000Z'), 'General');
        const transaction3 = new Transaction('id3', 40.00, new Date('2018-03-06T11:25:12.000Z'), 'General');
        const transactionHistory = new TransactionHistory([transaction1, transaction2, transaction3]);
        const transactionsIndexView = new TransactionsIndexView(
            transaction1.occurredAt(),
            transactionHistory
        );

        const transactionsIndexPage = shallow(
            <TransactionsIndexPage
                transactionsIndexView={transactionsIndexView}
            />
        );
        
        const cols = transactionsIndexPage.find('td');
        expect(cols).toHaveLength(17);

        expect(cols.at(0).text()).toBe('Tuesday, March 6, 2018');
        
        expect(cols.at(1).children().props().name).toBe('dollar');
        expect(cols.at(2).text()).toBe('General');
        expect(cols.at(3).text()).toBe('$30.00');

        expect(cols.at(4).children().props().name).toBe('dollar');
        expect(cols.at(5).text()).toBe('General');
        expect(cols.at(6).text()).toBe('$40.00');
        
        expect(cols.at(8).text()).toBe('Total');
        expect(cols.at(9).text()).toBe('$70.00');

        expect(cols.at(10).text()).toBe('Monday, March 5, 2018');

        expect(cols.at(11).children().props().name).toBe('dollar');
        expect(cols.at(12).text()).toBe('General');
        expect(cols.at(13).text()).toBe('$20.00');

        expect(cols.at(15).text()).toBe('Total');
        expect(cols.at(16).text()).toBe('$20.00');
    });

    it('renders transaction amounts with classes based on whether they are income or expenses', () => {
        const expense = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
        const income = new Transaction('id2', 30.00, new Date('2018-03-06T11:24:12.000Z'), 'Income');
        const transactionHistory = new TransactionHistory([expense, income]);
        const transactionsIndexView = new TransactionsIndexView(
            expense.occurredAt(),
            transactionHistory
        );

        const transactionsIndexPage = shallow(
            <TransactionsIndexPage
                transactionsIndexView={transactionsIndexView}
            />
        );
        
        const cols = transactionsIndexPage.find('td');
    
        expect(cols.at(2).text()).toBe('Income');
        expect(cols.at(3).hasClass('TransactionsIndexPage-amount--income')).toBeTruthy();

        expect(cols.at(9).text()).toBe('General');
        expect(cols.at(10).hasClass('TransactionsIndexPage-amount--expense')).toBeTruthy();
    });

    it('renders daily totals with classes based on whether there is net gain or loss', () => {
        const expense = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
        const income = new Transaction('id2', 30.00, new Date('2018-03-06T11:24:12.000Z'), 'Income');
        const transactionHistory = new TransactionHistory([expense, income]);
        const transactionsIndexView = new TransactionsIndexView(
            expense.occurredAt(),
            transactionHistory
        );

        const transactionsIndexPage = shallow(
            <TransactionsIndexPage
                transactionsIndexView={transactionsIndexView}
            />
        );
        
        const cols = transactionsIndexPage.find('td');
        expect(cols.at(6).hasClass('TransactionsIndexPage-total--gain')).toBeTruthy();
        expect(cols.at(13).hasClass('TransactionsIndexPage-total--loss')).toBeTruthy();
    });
});
