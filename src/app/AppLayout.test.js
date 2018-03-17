import AppLayout from 'app/AppLayout';

import React from 'react';
import { shallow } from 'enzyme';

describe('AppLayout', () => {
    it('renders child elements', () => {
        const appLayout = shallow(
            <AppLayout>
                <p className="greeting">Hi!</p>
            </AppLayout>
        );

        expect(appLayout.find('.greeting')).toHaveLength(1);
    });
});
