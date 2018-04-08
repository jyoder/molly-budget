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
        />);

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $40');
    });

    it('renders the current daily budget', () => {
        const dailyBudgetStore = new ValueStore(20);
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
        />);

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $20');
    });

    it('renders the current daily budget, truncated to a whole number', () => {
        const dailyBudgetStore = new ValueStore(20.1234);
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
        />);

        expect(dailyBudgetEditPage.find('.DailyBudgetEditPage-dailyBudget').text())
            .toBe('Your daily budget is $20');
    });

    it('renders a NumberPad', () => {
        const dailyBudgetStore = new ValueStore(20);
        const dailyBudgetEditPage = shallow(
            <DailyBudgetEditPage
                dailyBudgetStore={dailyBudgetStore}
        />);

        expect(dailyBudgetEditPage.find(NumberPad)).toHaveLength(1);
    });
});