import BudgetSummary from 'BudgetSummary';
import Budget from 'Budget';

import React from 'react';
import { shallow } from 'enzyme';

describe('BudgetSummary', () => {
    it('renders the current user\'s display name and current budget', () => {
        const user = { displayName: 'Fred Rogers' };
        const budget = new Budget(new Date(2018, 2, 15), 10.00);
        const budgetSummary = shallow(<BudgetSummary user={user} budget={budget}/>);

        expect(budgetSummary.find('.BudgetSummary-summary').text())
            .toBe('Hello Fred Rogers,you have $150.00 to spend today.');
    });
});
