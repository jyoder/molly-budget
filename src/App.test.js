import App from 'App';

import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
    it('renders authenticating if the user has not yet authenticated', () => {
        const auth = jest.fn(() => ({
            onAuthStateChanged: jest.fn()
        }));
        document.firebaseProvider = { auth: auth };

        const app = shallow(<App />);
        expect(app.text()).toBe('Authenticating...');
    });

    it('renders a greeting to the user if he or she has authenticated', () => {
        const onAuthStateChanged = jest.fn();
        const auth = jest.fn(() => ({
            onAuthStateChanged: onAuthStateChanged
        }));
        document.firebaseProvider = { auth: auth };

        const app = shallow(<App />);
        auth().onAuthStateChanged.mock.calls[0][0]({displayName: 'Larry Bird'});
        
        app.update();
        expect(app.text()).toBe('Hello Larry Bird!');
    });
});