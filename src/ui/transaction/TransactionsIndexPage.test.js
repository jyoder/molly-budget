import React from 'react';
import { shallow } from 'enzyme';

import TransactionsIndexPage from 'ui/transaction/TransactionsIndexPage';


describe('TransactionsIndexPage', () => {
    it('renders I like turtles', () => {
        const transactionsIndexPage = shallow(<TransactionsIndexPage transactionStore={{}} />);
        expect(transactionsIndexPage.find('p').text()).toBe('I like turtles.');
    });
});
