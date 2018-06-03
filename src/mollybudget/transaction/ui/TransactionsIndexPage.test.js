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
        
        const listItems = transactionsIndexPage.find('li');
        expect(listItems).toHaveLength(7);

        expect(listItems.at(0).find('.TransactionsIndexPage-date').text()).toBe('Tuesday, March 6, 2018');

        expect(listItems.at(1).find('.TransactionsIndexPage-categoryIcon').children().props().name).toBe('dollar');
        expect(listItems.at(1).find('.TransactionsIndexPage-category').text()).toBe('General');
        expect(listItems.at(1).find('.TransactionsIndexPage-amount').text()).toBe('$30.00');

        expect(listItems.at(2).find('.TransactionsIndexPage-categoryIcon').children().props().name).toBe('dollar');
        expect(listItems.at(2).find('.TransactionsIndexPage-category').text()).toBe('General');
        expect(listItems.at(2).find('.TransactionsIndexPage-amount').text()).toBe('$40.00');
            
        expect(listItems.at(3).find('.TransactionsIndexPage-totalLabel').text()).toBe('Total');
        expect(listItems.at(3).find('.TransactionsIndexPage-total').text()).toBe('$70.00');

        expect(listItems.at(4).find('.TransactionsIndexPage-date').text()).toBe('Monday, March 5, 2018');

        expect(listItems.at(5).find('.TransactionsIndexPage-categoryIcon').children().props().name).toBe('dollar');
        expect(listItems.at(5).find('.TransactionsIndexPage-category').text()).toBe('General');
        expect(listItems.at(5).find('.TransactionsIndexPage-amount').text()).toBe('$20.00');

        expect(listItems.at(6).find('.TransactionsIndexPage-totalLabel').text()).toBe('Total');
        expect(listItems.at(6).find('.TransactionsIndexPage-total').text()).toBe('$20.00');
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
        
        const listItems = transactionsIndexPage.find('li');

        expect(listItems.at(1).find('.TransactionsIndexPage-category').text()).toBe('Income');
        expect(listItems.at(1).find('.TransactionsIndexPage-amount').hasClass('TransactionsIndexPage-amount--income')).toBeTruthy();

        expect(listItems.at(4).find('.TransactionsIndexPage-category').text()).toBe('General');
        expect(listItems.at(4).find('.TransactionsIndexPage-amount').hasClass('TransactionsIndexPage-amount--expense')).toBeTruthy();
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
        
        const listItems = transactionsIndexPage.find('li');
        expect(listItems.at(2).find('.TransactionsIndexPage-total').hasClass('TransactionsIndexPage-total--gain')).toBeTruthy();
        expect(listItems.at(5).find('.TransactionsIndexPage-total').hasClass('TransactionsIndexPage-total--loss')).toBeTruthy();
    });
});
