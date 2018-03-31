import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import AppRoutes from 'ui/app/AppRoutes';
import BudgetSummaryPage from 'ui/summary/BudgetSummaryPage';
import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import TransactionCategoriesPage from 'ui/transaction/TransactionCategoriesPage';
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
        expect(wrapper.find(TransactionAmountPage)).toHaveLength(0);
        expect(wrapper.find(TransactionCategoriesPage)).toHaveLength(0);
    });

    it('renders TransactionAmountPage when the user navigates to /transactions', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <AppRoutes appStore={_appStore()} budget={budget}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionAmountPage)).toHaveLength(1);
        expect(wrapper.find(TransactionCategoriesPage)).toHaveLength(0);
    });

    it('renders TransactionCategoriesPage when the user navigates to /categories', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/categories']}>
                <AppRoutes appStore={_appStore()} budget={budget}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionAmountPage)).toHaveLength(0);
        expect(wrapper.find(TransactionCategoriesPage)).toHaveLength(1);
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
