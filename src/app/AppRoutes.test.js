import AppRoutes from 'app/AppRoutes';

import BudgetSummary from 'summary/BudgetSummaryPage';
import Budget from 'summary/Budget';
import Transactions from 'transaction/TransactionsPage';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

describe('AppRoutes', () => {
    it('renders BudgetSummary when the user navigates to /', () => {
        const user = {};
        const budget = Budget.create(10.00);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <AppRoutes user={user} budget={budget} />
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummary)).toHaveLength(1);
        expect(wrapper.find(Transactions)).toHaveLength(0);
    });

    it('renders Transactions when the user navigates to /transactions', () => {
        const user = {};
        const budget = Budget.create(10.00);
        const wrapper = mount(
            <MemoryRouter initialEntries={['/transactions']}>
                <AppRoutes user={user} budget={budget}/>
            </MemoryRouter>
        );
        expect(wrapper.find(BudgetSummary)).toHaveLength(0);
        expect(wrapper.find(Transactions)).toHaveLength(1);
    });
});
