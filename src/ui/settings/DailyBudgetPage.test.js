import React from 'react';
import { shallow } from 'enzyme';

import DailyBudgetPage from 'ui/settings/DailyBudgetPage';


describe('DailyBudgetPage', () => {
    it('renders the current daily budget', () => {
        const dailyBudgetPage = shallow(
            <DailyBudgetPage
                currentDailyBudget={30.00}
                history={history}
            />
        );
        
        expect(dailyBudgetPage.find('.DailyBudgetPage-dailyBudget').text())
            .toBe('Your daily budget is $30');
    });

    it('navigates to /settings/daily_budget/edit when the edit button is clicked', () => {
        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetPage
                currentDailyBudget={30.00}
                history={history}
            />
        );

        dailyBudgetEditPage.find('.DailyBudgetPage-edit').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/settings/daily_budget/edit');
    });
});
