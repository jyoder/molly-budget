import React from 'react';
import { shallow } from 'enzyme';

import TransactionsIndexPage from 'ui/transaction/TransactionsIndexPage';
import TransactionsIndexView from 'ui/transaction/TransactionsIndexView';
import TransactionHistory from 'ui/transaction/TransactionHistory';
import Transaction from 'state/Transaction';

import FontAwesome from 'react-fontawesome';


describe('TransactionsIndexPage', () => {
    it('renders transactions by day in order of newest to oldest', () => {
        const transaction1 = new Transaction('id1', 20.00, new Date('2018-03-05T11:24:12.000Z'), 'General');
        const transaction2 = new Transaction('id2', 30.00, new Date('2018-03-06T11:24:12.000Z'), 'General');
        const transaction3 = new Transaction('id3', 40.00, new Date('2018-03-06T11:25:12.000Z'), 'General');
        const transactionHistory = new TransactionHistory([transaction1, transaction2, transaction3]);
        const transactionsIndexView = new TransactionsIndexView(
            transaction1.occurredAt().getMonth(),
            transactionHistory
        );

        const transactionsIndexPage = shallow(
            <TransactionsIndexPage transactionsIndexView={transactionsIndexView}
        />);
        
        const cols = transactionsIndexPage.find('td');
        expect(cols).toHaveLength(17);

        expect(cols.at(0).text()).toBe('Tuesday, March 6, 2018');
        
        expect(cols.at(1).children().props().name).toBe('dollar');
        expect(cols.at(2).text()).toBe('General');
        expect(cols.at(3).text()).toBe('$40.00');

        expect(cols.at(4).children().props().name).toBe('dollar');
        expect(cols.at(5).text()).toBe('General');
        expect(cols.at(6).text()).toBe('$30.00');
        
        expect(cols.at(8).text()).toBe('Total');
        expect(cols.at(9).text()).toBe('$70.00');

        expect(cols.at(10).text()).toBe('Monday, March 5, 2018');

        expect(cols.at(11).children().props().name).toBe('dollar');
        expect(cols.at(12).text()).toBe('General');
        expect(cols.at(13).text()).toBe('$20.00');

        expect(cols.at(15).text()).toBe('Total');
        expect(cols.at(16).text()).toBe('$20.00');
    });
});
