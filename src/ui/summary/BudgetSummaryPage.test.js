import React from 'react';
import { shallow } from 'enzyme';

import BudgetSummary from 'ui/summary/BudgetSummaryPage';
import Budget from 'state/Budget';
import { Button } from 'reactstrap';


describe('BudgetSummary', () => {
    it('renders the current user\'s display name and current budget', () => {
        const user = { displayName: 'Fred Rogers' };
        const budget = new Budget(new Date(2018, 2, 15), 10.00, []);
        const history = { push: jest.fn() };
        const budgetSummary = shallow(<BudgetSummary user={user} budget={budget} history={history}/>);

        expect(budgetSummary.find('.BudgetSummaryPage-summary').text())
            .toBe('Hello Fred Rogers,you have $150.00 to spend today.');
    });

    it('renders the add transaction button', () => {
        const user = { displayName: 'Fred Rogers' };
        const budget = new Budget(new Date(2018, 2, 15), 10.00, []);
        const history = { push: jest.fn() };
        const budgetSummary = shallow(<BudgetSummary user={user} budget={budget} history={history}/>);

        expect(budgetSummary.find('.BudgetSummaryPage-addTransaction')).toHaveLength(1);
    });

    it('navigates to the transactions page when the add transaction button is clicked', () => {
        const user = { displayName: 'Fred Rogers' };
        const budget = new Budget(new Date(2018, 2, 15), 10.00, []);
        const history = { push: jest.fn() };
        const budgetSummary = shallow(<BudgetSummary user={user} budget={budget} history={history}/>);

        budgetSummary.find('.BudgetSummaryPage-addTransaction').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/transactions');
    });
});
