import React from 'react';
import { shallow } from 'enzyme';

import BudgetSummary from 'mollybudget/budget/ui/BudgetSummaryPage';
import Budget from 'mollybudget/budget/model/Budget';
import DailyBudget from 'mollybudget/state/DailyBudget';
import { Button } from 'reactstrap';


describe('BudgetSummary', () => {
    it('renders the current user\'s display name and current budget', () => {
        const user = { displayName: 'Fred Rogers' };
        const dailyBudget = new DailyBudget('id1', 50.00, new Date('2018-02-12T11:00:00.000Z'));
        const budget = new Budget(new Date('2018-02-15T11:00:00.000Z'), [dailyBudget], []);
        const history = { push: jest.fn() };
        const budgetSummary = shallow(<BudgetSummary user={user} budget={budget} history={history}/>);

        expect(budgetSummary.find('.BudgetSummaryPage-summary').text())
            .toBe('Hello Fred Rogers,you have $150.00 to spend today.');
    });

    it('navigates to /transactions/new when the add transaction button is clicked', () => {
        const user = { displayName: 'Fred Rogers' };
        const budget = new Budget(new Date('2018-02-15T11:00:00.000Z'), [], []);
        const history = { push: jest.fn() };
        const budgetSummary = shallow(<BudgetSummary user={user} budget={budget} history={history}/>);

        budgetSummary.find('.BudgetSummaryPage-addTransaction').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/transactions/new');
    });

    it('navigates to /transactions when the view past transactions button is clicked', () => {
        const user = { displayName: 'Fred Rogers' };
        const budget = new Budget(new Date('2018-02-15T11:00:00.000Z'), [], []);
        const history = { push: jest.fn() };
        const budgetSummary = shallow(<BudgetSummary user={user} budget={budget} history={history}/>);

        budgetSummary.find('.BudgetSummaryPage-viewPastTransactions').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/transactions');
    });
});
