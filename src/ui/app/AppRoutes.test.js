import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import AppRoutes from 'ui/app/AppRoutes';
import BudgetSummaryPage from 'ui/summary/BudgetSummaryPage';
import TransactionsPage from 'ui/transaction/TransactionsPage';
import CategorySelectionPage from 'ui/transaction/CategorySelectionPage';
import Budget from 'state/Budget';


describe('AppRoutes', () => {
    it('renders BudgetSummaryPage when the user navigates to /', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <AppRoutes appStore={_appStore()} budget={budget} />
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(1);
        expect(wrapper.find(TransactionsPage)).toHaveLength(0);
        expect(wrapper.find(CategorySelectionPage)).toHaveLength(0);
    });

    it('renders TransactionsPage when the user navigates to /transactions', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <AppRoutes appStore={_appStore()} budget={budget}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionsPage)).toHaveLength(1);
        expect(wrapper.find(CategorySelectionPage)).toHaveLength(0);
    });

    it('renders CategorySelectionPage when the user navigates to /categories', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/categories']}>
                <AppRoutes appStore={_appStore()} budget={budget}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionsPage)).toHaveLength(0);
        expect(wrapper.find(CategorySelectionPage)).toHaveLength(1);
    });
});

function _appStore() {
    const user = jest.fn(() => ({}));
    return {
        user: user,
        amountStore: jest.fn(() => ({ value: jest.fn() })),
        transactionStore: jest.fn(() => ({}))
    };
}
