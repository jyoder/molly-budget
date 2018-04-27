import React from 'react';
import { shallow } from 'enzyme';

import LoadingPage from 'mollybudget/auth/ui/LoadingPage';


describe('LoadingPage', () => {
    it('renders a message indicating authentication is underway', () => {
        const authenticationIndicator = shallow(<LoadingPage />);
        expect(authenticationIndicator.find('.LoadingPage-heading').text()).toBe('Loading');
    });
});
