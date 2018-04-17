import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import AppRoutes from 'ui/app/AppRoutes';
import BudgetSummaryPage from 'ui/summary/BudgetSummaryPage';
import TransactionRoutes from 'ui/transaction/TransactionRoutes';
import SettingsRoutes from 'ui/settings/SettingsRoutes';
import Budget from 'state/Budget';


describe('AppRoutes', () => {
    it('renders BudgetSummaryPage when the user navigates to /', () => {
        const budget = Budget.create([], []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <AppRoutes appStore={_appStore()} budget={budget} location={{}} />
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(1);
        expect(wrapper.find(TransactionRoutes)).toHaveLength(0);
        expect(wrapper.find(SettingsRoutes)).toHaveLength(0);
    });

    it('renders TransactionAmountPage when the user navigates to /transactions', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <AppRoutes appStore={_appStore()} budget={budget} location={{}}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionRoutes)).toHaveLength(1);
        expect(wrapper.find(SettingsRoutes)).toHaveLength(0);
    });

    it('renders SettingsRoutes when the user navigates to /settings', () => {
        const budget = Budget.create(10.00, []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/settings']}>
                <AppRoutes appStore={_appStore()} budget={budget} location={{}}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionRoutes)).toHaveLength(0);
        expect(wrapper.find(SettingsRoutes)).toHaveLength(1);
    });
});

function _appStore() {
    const user = jest.fn(() => ({}));
    return {
        user: user,
        transactionStore: jest.fn(() => ({})),
        dailyBudgetStore: jest.fn(() => ({}))
    };
}
