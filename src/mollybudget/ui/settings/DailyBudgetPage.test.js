import React from 'react';
import { shallow } from 'enzyme';

import DailyBudgetPage from 'mollybudget/ui/settings/DailyBudgetPage';


describe('DailyBudgetPage', () => {
    it('renders the current daily budget', () => {
        const dailyBudgetStore = {
            currentDailyBudget: jest.fn(() => ({ amount: jest.fn(() => 30.00) }))
        };

        const dailyBudgetPage = shallow(
            <DailyBudgetPage
                dailyBudgetStore={dailyBudgetStore}
                history={history}
            />
        );
        
        expect(dailyBudgetPage.find('.DailyBudgetPage-dailyBudget').text())
            .toBe('Your daily budget is $30');
    });

    it('navigates to /settings/daily_budget/edit when the edit button is clicked', () => {
        const dailyBudgetStore = {
            currentDailyBudget: jest.fn(() => ({ amount: jest.fn(() => 30.00) }))
        };

        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetPage
                dailyBudgetStore={dailyBudgetStore}
                history={history}
            />
        );

        dailyBudgetEditPage.find('.DailyBudgetPage-edit').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/settings/daily_budget/edit');
    });
});
