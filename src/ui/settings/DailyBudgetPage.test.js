import React from 'react';
import { shallow } from 'enzyme';

import DailyBudgetPage from 'ui/settings/DailyBudgetPage';


describe('DailyBudgetPage', () => {
    it('renders $40.00 as the current daily budget', () => {
        const dailyBudgetPage = shallow(<DailyBudgetPage />);
        expect(dailyBudgetPage.find('.DailyBudgetPage-dailyBudget').text())
            .toBe('Your daily budget is $40');
    });
});
