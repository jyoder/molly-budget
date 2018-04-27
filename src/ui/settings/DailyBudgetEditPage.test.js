import React from 'react';
import { shallow } from 'enzyme';

import DailyBudgetEditPage from 'ui/settings/DailyBudgetEditPage';
import NumberPad from 'ui/numpad/NumberPad';
import ValueStore from 'state/ValueStore';


describe('DailyBudgetEditPage', () => {
    it('renders the current daily budget if no value is available in the budgetInputStore', () => {
        const budgetInputStore = new ValueStore();
        const currentDailyBudget = { amount: jest.fn(() => 40.00) };
        const dailyBudgetStore = { currentDailyBudget: jest.fn(() => currentDailyBudget) };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                budgetInputStore={budgetInputStore}
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
            />
        );

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $40');
    });

    it('renders the value in the input store if it is available', () => {
        const budgetInputStore = new ValueStore(20);
        const dailyBudgetStore = {};
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                budgetInputStore={budgetInputStore}
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
            />
        );

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $20');
    });

    it('renders the current daily budget, truncated to a whole number', () => {
        const budgetInputStore = new ValueStore(20.1234);
        const dailyBudgetStore = {};
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                budgetInputStore={budgetInputStore}
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
            />
        );

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $20');
    });

    it('renders a NumberPad', () => {
        const budgetInputStore = new ValueStore(20);
        const dailyBudgetStore = {};
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                budgetInputStore={budgetInputStore}
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
            />
        );

        expect(dailyBudgetEditPage.find(NumberPad)).toHaveLength(1);
    });

    it('saves the daily budget and returns to /settings/daily_budget when the save change button is clicked', () => {
        const budgetInputStore = new ValueStore(20);
        const dailyBudgetStore = { addDailyBudget: jest.fn() };
        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                budgetInputStore={budgetInputStore}
                dailyBudgetStore={dailyBudgetStore}
                history={history}
            />
        );

        dailyBudgetEditPage.find('.DailyBudgetEditPage-saveChange').simulate('click');
        expect(dailyBudgetStore.addDailyBudget).toHaveBeenCalledTimes(1);
        expect(dailyBudgetStore.addDailyBudget.mock.calls[0][0]).toBeCloseTo(20.00);
        expect(dailyBudgetStore.addDailyBudget.mock.calls[0][1]).toBeInstanceOf(Date);
        expect(history.push).toHaveBeenCalledWith('/settings/daily_budget');
    });

    it('navigates back to /settings/daily_budget when the go back button is clicked', () => {
        const budgetInputStore = new ValueStore(20);
        const dailyBudgetStore = { addDailyBudget: jest.fn() };
        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                budgetInputStore={budgetInputStore}
                dailyBudgetStore={dailyBudgetStore}
                history={history}
            />
        );

        dailyBudgetEditPage.find('.DailyBudgetEditPage-goBack').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/settings/daily_budget');
    });
});
