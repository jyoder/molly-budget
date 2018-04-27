import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import TransactionRoutes from 'mollybudget/transaction/TransactionRoutes';
import TransactionAmountPage from 'mollybudget/transaction/TransactionAmountPage';
import TransactionsIndexPage from 'mollybudget/transaction/TransactionsIndexPage';


describe('TransactionRoutes', () => {
    it('renders TransactionsIndexPage when the user navigates to /transactions', () => {
        const transactionStore = { transactions: jest.fn(() => []) };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <TransactionRoutes transactionStore={transactionStore} history={{}} location={{}}/>
            </MemoryRouter>
        );
        expect(wrapper.find(TransactionAmountPage)).toHaveLength(0);
        expect(wrapper.find(TransactionsIndexPage)).toHaveLength(1);
    });

    it('renders TransactionAmountPage when the user navigates to /transactions/new', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions/new']}>
                <TransactionRoutes transactionStore={{}} history={{}} location={{}}/>
            </MemoryRouter>
        );
        expect(wrapper.find(TransactionAmountPage)).toHaveLength(1);
        expect(wrapper.find(TransactionsIndexPage)).toHaveLength(0);
    });
});
