import React from 'react';
import { shallow } from 'enzyme';

import SettingsPage from 'ui/settings/SettingsPage';


describe('SettingsPage', () => {
    it('renders $40.00 as the current daily budget', () => {
        const settingsPage = shallow(<SettingsPage />);
        expect(settingsPage.find('.SettingsPage-dailyBudget').text())
            .toBe('Your daily budget is $40');
    });
});
