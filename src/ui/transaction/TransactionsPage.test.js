import React from 'react';
import { shallow } from 'enzyme';

import TransactionsPage from 'ui/transaction/TransactionsPage';
import CurrencyInput from 'ui/transaction/CurrencyInput';
import SubmitTransactionMenu from 'ui/transaction/SubmitTransactionMenu';


describe('TransactionsPage', () => {
    it('renders a CurrencyInput', () => {
        const transactionStore = {};
        const history = {};
        
        const transactionsPage = shallow(<TransactionsPage
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionsPage.find(CurrencyInput)).toHaveLength(1);
    });

    it('renders a SubmitTransactionMenu', () => {
        const transactionStore = {};
        const history = {};
        
        const transactionsPage = shallow(<TransactionsPage
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionsPage.find(SubmitTransactionMenu)).toHaveLength(1);
    });
});
