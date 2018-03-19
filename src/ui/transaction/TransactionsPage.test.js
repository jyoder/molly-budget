import React from 'react';
import { shallow } from 'enzyme';

import Transactions from 'ui/transaction/TransactionsPage';


describe('Transactions', () => {
    it('renders a dummy message', () => {
        const transactions = shallow(<Transactions />);
        expect(transactions.find('.Transactions-dummyMessage').text());
    });
});
