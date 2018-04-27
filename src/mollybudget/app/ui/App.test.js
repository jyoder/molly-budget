import React from 'react';
import { shallow } from 'enzyme';

import App from 'mollybudget/app/ui/App';
import AppRoutes from 'mollybudget/app/ui/AppRoutes';
import LoadingPage from 'mollybudget/auth/ui/LoadingPage';
import AppStore from 'mollybudget/app/model/AppStore';


describe('App', () => {
    it('renders LoadingPage while the app has not been fully initialized', () => {
        const app = shallow(<App appStore={new AppStore()} location={{}}/>);
        expect(app.find(LoadingPage)).toHaveLength(1);
    });
 
    it('renders AppRoutes when the app has been fully initialized', () => {
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
