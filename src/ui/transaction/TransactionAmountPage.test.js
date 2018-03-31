import React from 'react';
import { shallow } from 'enzyme';

import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import NumberPadDisplay from 'ui/numpad/NumberPadDisplay';
import NumberPad from 'ui/numpad/NumberPad';
import SubmitTransactionMenu from 'ui/transaction/SubmitTransactionMenu';
import { Button } from 'reactstrap';


describe('TransactionAmountPage', () => {
    it('renders a NumberPadDisplay', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = {};
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionAmountPage.find(NumberPadDisplay)).toHaveLength(1);
    });

    it('renders a NumberPad', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = {};
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionAmountPage.find(NumberPad)).toHaveLength(1);
    });

    it('navigates to /transactions/categories when the choose category button is clicked', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = { push: jest.fn() };
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        transactionAmountPage.find('.TransactionAmountPage-chooseCategoryButton').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/transactions/categories');
    });

    it('navigates to / when the go back button is clicked', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = { push: jest.fn() };
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        transactionAmountPage.find('.TransactionAmountPage-backButton').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/');
    });
});
