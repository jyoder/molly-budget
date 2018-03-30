import React from 'react';
import { shallow } from 'enzyme';

import TransactionsPage from 'ui/transaction/TransactionsPage';
import NumberPadDisplay from 'ui/numpad/NumberPadDisplay';
import NumberPad from 'ui/numpad/NumberPad';
import SubmitTransactionMenu from 'ui/transaction/SubmitTransactionMenu';
import { Button } from 'reactstrap';


describe('TransactionsPage', () => {
    it('renders a NumberPadDisplay', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = {};
        
        const transactionsPage = shallow(<TransactionsPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionsPage.find(NumberPadDisplay)).toHaveLength(1);
    });

    it('renders a NumberPad', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = {};
        
        const transactionsPage = shallow(<TransactionsPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionsPage.find(NumberPad)).toHaveLength(1);
    });

    it('navigates to /categories when the choose category button is clicked', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = { push: jest.fn() };
        
        const transactionsPage = shallow(<TransactionsPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        transactionsPage.find('.TransactionsPage-chooseCategoryButton').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/categories');
    });

    it('navigates to / when the go back button is clicked', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = { push: jest.fn() };
        
        const transactionsPage = shallow(<TransactionsPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        transactionsPage.find('.TransactionsPage-backButton').simulate('click');
        expect(history.push).toHaveBeenCalledWith('/');
    });
});
