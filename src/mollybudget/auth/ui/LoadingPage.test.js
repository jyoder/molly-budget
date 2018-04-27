import React from 'react';
import { shallow } from 'enzyme';

import LoadingPage from 'mollybudget/auth/ui/LoadingPage';


describe('LoadingPage', () => {
    it('renders a message to indicate the app is loading', () => {
        const loadingPage = shallow(<LoadingPage />);
        expect(loadingPage.find('.LoadingPage-heading').text()).toBe('Loading');
    });
});
