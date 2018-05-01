import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import SettingsRoutes from 'mollybudget/settings/ui/SettingsRoutes';
import DailyBudgetPage from 'mollybudget/settings/ui/DailyBudgetPage';
import DailyBudgetEditPage from 'mollybudget/settings/ui/DailyBudgetEditPage';


describe('SettingsRoutes', () => {
    it('renders DailyBudgetPage when the user navigates to /settings/daily_budget', () => {
        const currentDailyBudget = { amount: jest.fn(() => 40.00) };
        const dailyBudgetStore = { currentDailyBudget: jest.fn(() => currentDailyBudget) };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/settings/daily_budget']}>
                <SettingsRoutes dailyBudgetStore={dailyBudgetStore}/>
            </MemoryRouter>
        );
        expect(wrapper.find(DailyBudgetPage)).toHaveLength(1);
        expect(wrapper.find(DailyBudgetEditPage)).toHaveLength(0);
    });

    it('renders DailyBudgetEditPage when the user navigates to /settings/daily_budget/edit', () => {
        const currentDailyBudget = { amount: jest.fn(() => 40.00) };
        const dailyBudgetStore = { currentDailyBudget: jest.fn(() => currentDailyBudget) };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/settings/daily_budget/edit']}>
                <SettingsRoutes dailyBudgetStore={dailyBudgetStore} />
            </MemoryRouter>
        );
        expect(wrapper.find(DailyBudgetPage)).toHaveLength(0);
        expect(wrapper.find(DailyBudgetEditPage)).toHaveLength(1);
    });
});
