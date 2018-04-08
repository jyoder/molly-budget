import React from 'react';
import { shallow } from 'enzyme';

import DailyBudgetPage from 'ui/settings/DailyBudgetPage';


describe('DailyBudgetPage', () => {
    it('renders $40.00 as the current daily budget', () => {
        const dailyBudgetPage = shallow(<DailyBudgetPage />);
        expect(dailyBudgetPage.find('.DailyBudgetPage-dailyBudget').text())
            .toBe('Your daily budget is $40');
    });

    it('navigates to /settings/daily_budget/edit when the edit button is clicked', () => {
        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetPage
                history={history}
            />
        );

        dailyBudgetEditPage.find('.DailyBudgetPage-edit').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/settings/daily_budget/edit');
    });

    it('navigates back to / when the budget summary button is clicked', () => {
        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetPage
                history={history}
            />
        );

        dailyBudgetEditPage.find('.DailyBudgetPage-budgetSummary').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/');
    });
});
