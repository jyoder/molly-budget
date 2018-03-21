import React from 'react';
import { shallow } from 'enzyme';

import TransactionsPage from 'ui/transaction/TransactionsPage';
import CurrencyInput from 'ui/transaction/CurrencyInput';
import SubmitTransactionButton from 'ui/transaction/SubmitTransactionButton';


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

    it('renders a SubmitTransactionButton', () => {
        const transactionStore = {};
        const history = {};
        
        const transactionsPage = shallow(<TransactionsPage
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionsPage.find(SubmitTransactionButton)).toHaveLength(1);
    });
});
