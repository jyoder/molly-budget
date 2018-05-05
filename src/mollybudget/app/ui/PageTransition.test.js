import React from 'react';
import { shallow } from 'enzyme';

import PageTransition from 'mollybudget/app/ui/PageTransition';


describe('PageTransition', () => {
    it('renders child elements', () => {
        const appLayout = shallow(
            <PageTransition location={{}}>
                <p className="greeting">Hi!</p>
            </PageTransition>
        );

        expect(appLayout.find('.greeting')).toHaveLength(1);
    });
});
