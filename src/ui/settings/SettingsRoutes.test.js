import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import SettingsRoutes from 'ui/settings/SettingsRoutes';
import DailyBudgetPage from 'ui/settings/DailyBudgetPage';
import DailyBudgetEditPage from 'ui/settings/DailyBudgetEditPage';


describe('SettingsRoutes', () => {
    it('renders DailyBudgetPage when the user navigates to /settings/daily_budget', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/settings/daily_budget']}>
                <SettingsRoutes />
            </MemoryRouter>
        );
        expect(wrapper.find(DailyBudgetPage)).toHaveLength(1);
        expect(wrapper.find(DailyBudgetEditPage)).toHaveLength(0);
    });

    it('renders DailyBudgetEditPage when the user navigates to /settings/daily_budget/edit', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/settings/daily_budget/edit']}>
                <SettingsRoutes />
            </MemoryRouter>
        );
        expect(wrapper.find(DailyBudgetPage)).toHaveLength(0);
        expect(wrapper.find(DailyBudgetEditPage)).toHaveLength(1);
    });
});
