import React from 'react';
import { shallow } from 'enzyme';

import DailyBudgetEditPage from 'ui/settings/DailyBudgetEditPage';
import ValueStore from 'state/ValueStore';


describe('DailyBudgetEditPage', () => {
    it('renders the current daily budget', () => {
        const dailyBudgetStore = new ValueStore(20);
        const dailyBudgetEditPage = shallow(<DailyBudgetEditPage
            dailyBudgetStore={dailyBudgetStore}
        />);

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $20');
    });
});