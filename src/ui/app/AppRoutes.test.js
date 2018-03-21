import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import AppRoutes from 'ui/app/AppRoutes';
import BudgetSummary from 'ui/summary/BudgetSummaryPage';
import Transactions from 'ui/transaction/TransactionsPage';
import Budget from 'state/Budget';


describe('AppRoutes', () => {
    it('renders BudgetSummary when the user navigates to /', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <AppRoutes appStore={_appStore()} budget={budget} />
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummary)).toHaveLength(1);
        expect(wrapper.find(Transactions)).toHaveLength(0);
    });

    it('renders TransactionsPage when the user navigates to /transactions', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <AppRoutes appStore={_appStore()} budget={budget}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummary)).toHaveLength(0);
        expect(wrapper.find(Transactions)).toHaveLength(1);
    });
});

function _appStore() {
    const user = jest.fn(() => 'John');
    return {
        user: user,
        transactionStore: jest.fn()
    };
}
