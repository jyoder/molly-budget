import React from 'react';
import { shallow } from 'enzyme';

import AuthenticationIndicator from 'authentication/AuthenticationIndicator';


describe('AuthenticationIndicator', () => {
    it('renders a message indicating authentication is underway', () => {
        const authenticationIndicator = shallow(<AuthenticationIndicator />);
        expect(authenticationIndicator.text()).toBe('Authenticating...');
    });
});
