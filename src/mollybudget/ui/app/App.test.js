import React from 'react';
import { shallow } from 'enzyme';

import App from 'mollybudget/ui/app/App';
import AppRoutes from 'mollybudget/ui/app/AppRoutes';
import AuthenticationIndicator from 'mollybudget/ui/auth/AuthenticationIndicator';
import AppStore from 'mollybudget/state/AppStore';


describe('App', () => {
    it('renders AuthenticationIndicator while the user has not yet authenticated', () => {
        const app = shallow(<App appStore={new AppStore()} location={{}}/>);
        expect(app.find(AuthenticationIndicator)).toHaveLength(1);
    });
 
    it('renders AppRoutes when the user has authenticated', () => {
        const appStore = new AppStore();
        appStore.setUser(_user());
        appStore.setTransactionStore(_transactionStore());
        appStore.setDailyBudgetStore(_dailyBudgetStore());

        const app = shallow(<App appStore={appStore} location={{}} />);
        expect(app.find(AppRoutes)).toHaveLength(1);
    });

    function _user() {
        return {
            uid: 'John'
        };
    }

    function _transactionStore() {
        return {
            transactions: jest.fn()
        };
    }

    function _dailyBudgetStore() {
        return {
            dailyBudgets: jest.fn()
        };
    }
});
