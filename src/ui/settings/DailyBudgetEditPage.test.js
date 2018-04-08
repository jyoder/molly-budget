import React from 'react';
import { shallow } from 'enzyme';

import DailyBudgetEditPage from 'ui/settings/DailyBudgetEditPage';
import NumberPad from 'ui/numpad/NumberPad';
import ValueStore from 'state/ValueStore';


describe('DailyBudgetEditPage', () => {
    it('renders a default value of $40 if no value is supplied', () => {
        const dailyBudgetStore = new ValueStore();
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
        />);

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $40');
    });

    it('renders the current daily budget', () => {
        const dailyBudgetStore = new ValueStore(20);
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
        />);

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $20');
    });

    it('renders the current daily budget, truncated to a whole number', () => {
        const dailyBudgetStore = new ValueStore(20.1234);
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
        />);

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $20');
    });

    it('renders a NumberPad', () => {
        const dailyBudgetStore = new ValueStore(20);
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
                history={{}}
        />);

        expect(dailyBudgetEditPage.find(NumberPad)).toHaveLength(1);
    });

    it('navigates back to /settings/daily_budget when the save change button is clicked', () => {
        const dailyBudgetStore = new ValueStore(20);
        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
                history={history}
        />);

        dailyBudgetEditPage.find('.DailyBudgetEditPage-saveChange').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/settings/daily_budget');
    });

    it('navigates back to /settings/daily_budget when the go back button is clicked', () => {
        const dailyBudgetStore = new ValueStore(20);
        const history = { push: jest.fn() };
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
                history={history}
        />);

        dailyBudgetEditPage.find('.DailyBudgetEditPage-goBack').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/settings/daily_budget');
    });
});