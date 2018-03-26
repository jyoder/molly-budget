import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import SubmitTransactionButton from 'ui/transaction/SubmitTransactionButton';

describe('SubmitTransactionButton', () => {
    it('renders as disabled when no amount is available in the amount store', () => {
        const currencyAmountStore = {
            amount: jest.fn(() => null)
        };
        const transactionStore = {};
        const history = {};

        const submitTransactionButton = shallow(<SubmitTransactionButton
            currencyAmountStore={currencyAmountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(submitTransactionButton.find(Button).props().disabled).toBeTruthy();
    });

    it('renders as enabled when an amount is available in the amount store', () => {
        const currencyAmountStore = {
            amount: jest.fn(() => 123.00)
        };
        const transactionStore = {};
        const history = {};

        const submitTransactionButton = shallow(<SubmitTransactionButton
            currencyAmountStore={currencyAmountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(submitTransactionButton.find(Button).props().disabled).toBeFalsy();
    });

    it('adds a new transaction and redirects to / upon clicking the button', () => {
        const currencyAmountStore = {
            amount: jest.fn(() => 123.00)
        };
        const transactionStore = {
            addTransaction: jest.fn()
        };
        const history = {
            push: jest.fn()
        };

        const submitTransactionButton = shallow(<SubmitTransactionButton
            currencyAmountStore={currencyAmountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        submitTransactionButton.find(Button).simulate('click');
        expect(transactionStore.addTransaction).toHaveBeenCalledTimes(1);
        expect(transactionStore.addTransaction.mock.calls[0][0]).toBeCloseTo(123.00);
        expect(transactionStore.addTransaction.mock.calls[0][1]).toBeInstanceOf(Date);
        expect(transactionStore.addTransaction.mock.calls[0][2]).toBe('General');

        expect(history.push).toHaveBeenCalledWith('/');
    });

    it('does not add a new transaction or redirect when there is no amount', () => {
        const currencyAmountStore = {
            amount: jest.fn(() => null)
        };
        const transactionStore = {
            addTransaction: jest.fn()
        };
        const history = {
            push: jest.fn()
        };

        const submitTransactionButton = shallow(<SubmitTransactionButton
            currencyAmountStore={currencyAmountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        submitTransactionButton.find(Button).simulate('click');
        expect(transactionStore.addTransaction).not.toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalledWith('/');
    });
});
