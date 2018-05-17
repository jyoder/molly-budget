import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import TransactionRoutes from 'mollybudget/transaction/ui/TransactionRoutes';
import TransactionAmountPage from 'mollybudget/transaction/ui/TransactionAmountPage';
import TransactionsIndexPage from 'mollybudget/transaction/ui/TransactionsIndexPage';


describe('TransactionRoutes', () => {
    it('renders TransactionsIndexPage when the user navigates to /transactions', () => {
        const transactionStore = { transactions: jest.fn(() => []) };
        const budget = { totalToDate: jest.fn(() => 100.00) };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <TransactionRoutes
                    transactionStore={transactionStore}
                    budget={budget}
                    dateSnapshot={new Date()}
                    history={{}}
                    location={{}}
                />
            </MemoryRouter>
        );
        expect(wrapper.find(TransactionAmountPage)).toHaveLength(0);
        expect(wrapper.find(TransactionsIndexPage)).toHaveLength(1);
    });

    it('renders TransactionAmountPage when the user navigates to /transactions/new', () => {
        const budget = { totalToDate: jest.fn(() => 100.00) };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions/new']}>
                <TransactionRoutes
                    transactionStore={{}}
                    budget={budget}
                    dateSnapshot={new Date()}
                    history={{}}
                    location={{}}
                />
            </MemoryRouter>
        );
        expect(wrapper.find(TransactionAmountPage)).toHaveLength(1);
        expect(wrapper.find(TransactionsIndexPage)).toHaveLength(0);
    });
});
