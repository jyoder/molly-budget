import App from 'app/App';
import AppRoutes from 'app/AppRoutes';
import AuthenticationIndicator from 'AuthenticationIndicator';

import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
    it('renders AuthenticationIndicator while the user has not yet authenticated', () => {
        const auth = jest.fn(() => ({
            onAuthStateChanged: jest.fn()
        }));
        const firebase = { auth: auth };

        const app = shallow(<App firebase={firebase}/>);
        expect(app.find(AuthenticationIndicator)).toHaveLength(1);
    });

    it('renders AppRoutes when the user has authenticated', () => {
        const onAuthStateChanged = jest.fn();
        const auth = jest.fn(() => ({
            onAuthStateChanged: onAuthStateChanged
        }));
        const firebase = { auth: auth };

        const app = shallow(<App firebase={firebase} />);
        auth().onAuthStateChanged.mock.calls[0][0]({});
        
        app.update();
        expect(app.find(AppRoutes)).toHaveLength(1);
    });
});
