import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import TransactionRoutes from 'ui/transaction/TransactionRoutes';
import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import TransactionsIndexPage from 'ui/transaction/TransactionsIndexPage';


describe('TransactionRoutes', () => {
    it('renders TransactionsIndexPage when the user navigates to /transactions', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <TransactionRoutes transactionStore={{}} history={{}} location={{}}/>
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
