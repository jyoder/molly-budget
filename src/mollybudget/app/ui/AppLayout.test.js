import React from 'react';
import { shallow } from 'enzyme';

import AppLayout from 'mollybudget/app/ui/AppLayout';


describe('AppLayout', () => {
    it('renders child elements', () => {
        const appLayout = shallow(
            <AppLayout location={{}}>
                <p className="greeting">Hi!</p>
            </AppLayout>
        );

        expect(appLayout.find('.greeting')).toHaveLength(1);
    });
});
