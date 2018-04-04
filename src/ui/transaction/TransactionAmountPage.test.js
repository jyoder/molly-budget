import React from 'react';
import { shallow } from 'enzyme';

import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import NumberPadDisplay from 'ui/numpad/NumberPadDisplay';
import NumberPad from 'ui/numpad/NumberPad';
import CategorySelector from 'ui/transaction/CategorySelector';
import { Button } from 'reactstrap';


describe('TransactionAmountPage', () => {
    it('renders a NumberPadDisplay', () => {
        const amountStore = { value: jest.fn() };
        const categoryStore = {};
        const transactionStore = {};
        const history = {};
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            categoryStore={categoryStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionAmountPage.find(NumberPadDisplay)).toHaveLength(1);
    });

    it('renders a CategorySelector', () => {
        const amountStore = { value: jest.fn() };
        const categoryStore = {};
        const transactionStore = {};
        const history = {};
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            categoryStore={categoryStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionAmountPage.find(CategorySelector)).toHaveLength(1);
    });

    it('renders a NumberPad', () => {
        const amountStore = { value: jest.fn() };
        const categoryStore = {};
        const transactionStore = {};
        const history = {};
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            categoryStore={categoryStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(transactionAmountPage.find(NumberPad)).toHaveLength(1);
    });

    it('disables the submit transaction button while the amount is null', () => {
        const amountStore = { value: jest.fn(() => null) };
        const categoryStore = { value: jest.fn(() => 'General') };
        const transactionStore = { addTransaction: jest.fn() };
        const history = { push: jest.fn() };
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            categoryStore={categoryStore}
            transactionStore={transactionStore}
            history={history}
        />);

        const submitTransaction = transactionAmountPage.find('.TransactionAmountPage-submitTransaction');
        expect(submitTransaction.prop('disabled')).toBeTruthy();
        
    });

    it('disables the submit transaction button while the amount is zero', () => {
        const amountStore = { value: jest.fn(() => 0.0) };
        const categoryStore = { value: jest.fn(() => 'General') };
        const transactionStore = { addTransaction: jest.fn() };
        const history = { push: jest.fn() };
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            categoryStore={categoryStore}
            transactionStore={transactionStore}
            history={history}
        />);

        const submitTransaction = transactionAmountPage.find('.TransactionAmountPage-submitTransaction');
        expect(submitTransaction.prop('disabled')).toBeTruthy();
        
    });

    it('submits the transaction and navigates to / when the submit transaction button is clicked', () => {
        const amountStore = { value: jest.fn(() => 123.00) };
        const categoryStore = { value: jest.fn(() => 'General') };
        const transactionStore = { addTransaction: jest.fn() };
        const history = { push: jest.fn() };
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            categoryStore={categoryStore}
            transactionStore={transactionStore}
            history={history}
        />);

        transactionAmountPage.find('.TransactionAmountPage-submitTransaction').simulate('click');
        expect(transactionStore.addTransaction).toHaveBeenCalledTimes(1);
        expect(transactionStore.addTransaction.mock.calls[0][0]).toBeCloseTo(123.00);
        expect(transactionStore.addTransaction.mock.calls[0][1]).toBeInstanceOf(Date);
        expect(transactionStore.addTransaction.mock.calls[0][2]).toBe('General');
        expect(history.push).toHaveBeenCalledWith('/');
    });

    it('navigates to / without submitting a transaction when the go back button is clicked', () => {
        const amountStore = { value: jest.fn() };
        const categoryStore = {};
        const transactionStore = { addTransaction: jest.fn() };
        const history = { push: jest.fn() };
        
        const transactionAmountPage = shallow(<TransactionAmountPage
            amountStore={amountStore}
            categoryStore={categoryStore}
            transactionStore={transactionStore}
            history={history}
        />);

        transactionAmountPage.find('.TransactionAmountPage-goBack').simulate('click');
        expect(transactionStore.addTransaction).not.toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith('/');
    });
});
