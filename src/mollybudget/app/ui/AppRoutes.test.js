import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import AppRoutes from 'mollybudget/app/ui/AppRoutes';
import TransactionRoutes from 'mollybudget/transaction/ui/TransactionRoutes';

import SettingsRoutes from 'mollybudget/settings/ui/SettingsRoutes';
import DailyBudget from 'mollybudget/settings/model/DailyBudget';

import BudgetSummaryPage from 'mollybudget/budget/ui/BudgetSummaryPage';
import Budget from 'mollybudget/budget/model/Budget';


describe('AppRoutes', () => {
    it('renders BudgetSummaryPage when the user navigates to /', () => {
        const today = new Date();
        const budget = new Budget([], []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <AppRoutes
                    appStore={_appStore()}
                    budget={budget}
                    dateSnapshot={today}
                    location={{}}
                />
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(1);
        expect(wrapper.find(TransactionRoutes)).toHaveLength(0);
        expect(wrapper.find(SettingsRoutes)).toHaveLength(0);
    });

    it('renders TransactionAmountPage when the user navigates to /transactions', () => {
        const today = new Date();
        const budget = new Budget([], []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <AppRoutes
                    appStore={_appStore()}
                    budget={budget}
                    dateSnapshot={today}
                    location={{}}
                />
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionRoutes)).toHaveLength(1);
        expect(wrapper.find(SettingsRoutes)).toHaveLength(0);
    });

    it('renders SettingsRoutes when the user navigates to /settings', () => {
        const today = new Date();
        const budget = new Budget([], []);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/settings']}>
                <AppRoutes
                    appStore={_appStore()}
                    budget={budget}
                    dateSnapshot={today}
                    location={{}}
                />
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummaryPage)).toHaveLength(0);
        expect(wrapper.find(TransactionRoutes)).toHaveLength(0);
        expect(wrapper.find(SettingsRoutes)).toHaveLength(1);
    });
});

function _appStore() {
    const user = jest.fn(() => ({}));
    const transactionStore = { transactions: jest.fn(() => []) };

    return {
        user: user,
        transactionStore: jest.fn(() => transactionStore),
        dailyBudgetStore: jest.fn(() => ({}))
    };
}
