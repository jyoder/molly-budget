import AuthenticationIndicator from 'authentication/AuthenticationIndicator';

import React from 'react';
import { shallow } from 'enzyme';

describe('AuthenticationIndicator', () => {
    it('renders a message indicating authentication is underway', () => {
        const authenticationIndicator = shallow(<AuthenticationIndicator />);
        expect(authenticationIndicator.text()).toBe('Authenticating...');
    });
});
