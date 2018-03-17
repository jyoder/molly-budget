import App from 'App';
import AuthenticationIndicator from 'AuthenticationIndicator';
import BudgetSummary from 'BudgetSummary';

import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
    it('renders AuthenticationIndicator while the user has not yet authenticated', () => {
        const auth = jest.fn(() => ({
            onAuthStateChanged: jest.fn()
        }));
        const firebase = { auth: auth };

        const app = shallow(<App firebase={firebase}/>);
        expect(app.find(AuthenticationIndicator).length).toBe(1);
    });

    it('renders BudgetApp when the user has authenticated', () => {
        const onAuthStateChanged = jest.fn();
        const auth = jest.fn(() => ({
            onAuthStateChanged: onAuthStateChanged
        }));
        const firebase = { auth: auth };

        const app = shallow(<App firebase={firebase} />);
        auth().onAuthStateChanged.mock.calls[0][0]({});
        
        app.update();
        expect(app.find(BudgetSummary).length).toBe(1);
    });
});
