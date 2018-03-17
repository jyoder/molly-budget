import Transactions from 'transaction/TransactionsPage';

import React from 'react';
import { shallow } from 'enzyme';

describe('Transactions', () => {
    it('renders a dummy message', () => {
        const transactions = shallow(<Transactions />);
        expect(transactions.find('.Transactions-dummyMessage').text());
    });
});
