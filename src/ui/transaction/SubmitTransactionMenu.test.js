import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import SubmitTransactionMenu from 'ui/transaction/SubmitTransactionMenu';

describe('SubmitTransactionMenu', () => {
    it('renders buttons for general, outing, car, and groceries', () => {
        const amountStore = {
            value: jest.fn(() => null)
        };
        const transactionStore = {};
        const history = {};

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-General')).toHaveLength(1);
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Outing')).toHaveLength(1);
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Car')).toHaveLength(1);
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Groceries')).toHaveLength(1);
    });

    it('renders as disabled when no amount is available in the amount store', () => {
        const amountStore = {
            value: jest.fn(() => null)
        };
        const transactionStore = {};
        const history = {};

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-General')
            .props().disabled).toBeTruthy();
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Outing')
            .props().disabled).toBeTruthy();
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Car')
            .props().disabled).toBeTruthy();
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Groceries')
            .props().disabled).toBeTruthy();
    });

    it('renders as enabled when an amount is available in the amount store', () => {
        const amountStore = {
            value: jest.fn(() => 123.00)
        };
        const transactionStore = {};
        const history = {};

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-General')
            .props().disabled).toBeFalsy();
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Outing')
            .props().disabled).toBeFalsy();
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Car')
            .props().disabled).toBeFalsy();
        expect(submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Groceries')
            .props().disabled).toBeFalsy();
    });

    it('adds a new general transaction, resets the amount, and redirects to / upon clicking the general button', () => {
        const amountStore = {
            value: jest.fn(() => 123.00),
            setValue: jest.fn()
        };
        const transactionStore = {
            addTransaction: jest.fn()
        };
        const history = {
            push: jest.fn()
        };

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        submitTransactionMenu.find('.SubmitTransactionMenu-Categories-General').simulate('click');
        expect(transactionStore.addTransaction).toHaveBeenCalledTimes(1);
        expect(transactionStore.addTransaction.mock.calls[0][0]).toBeCloseTo(123.00);
        expect(transactionStore.addTransaction.mock.calls[0][1]).toBeInstanceOf(Date);
        expect(transactionStore.addTransaction.mock.calls[0][2]).toBe('General');

        expect(history.push).toHaveBeenCalledWith('/');
        expect(amountStore.setValue).toHaveBeenCalledWith(0);
    });

    it('adds a new outing transaction, resets the amount, and redirects to / upon clicking the outing button', () => {
        const amountStore = {
            value: jest.fn(() => 123.00),
            setValue: jest.fn()
        };
        const transactionStore = {
            addTransaction: jest.fn()
        };
        const history = {
            push: jest.fn()
        };

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Outing').simulate('click');
        expect(transactionStore.addTransaction).toHaveBeenCalledTimes(1);
        expect(transactionStore.addTransaction.mock.calls[0][0]).toBeCloseTo(123.00);
        expect(transactionStore.addTransaction.mock.calls[0][1]).toBeInstanceOf(Date);
        expect(transactionStore.addTransaction.mock.calls[0][2]).toBe('Outing');

        expect(history.push).toHaveBeenCalledWith('/');
        expect(amountStore.setValue).toHaveBeenCalledWith(0);
    });

    it('adds a new car transaction and redirects to / upon clicking the car button', () => {
        const amountStore = {
            value: jest.fn(() => 123.00),
            setValue: jest.fn()
        };
        const transactionStore = {
            addTransaction: jest.fn()
        };
        const history = {
            push: jest.fn()
        };

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Car').simulate('click');
        expect(transactionStore.addTransaction).toHaveBeenCalledTimes(1);
        expect(transactionStore.addTransaction.mock.calls[0][0]).toBeCloseTo(123.00);
        expect(transactionStore.addTransaction.mock.calls[0][1]).toBeInstanceOf(Date);
        expect(transactionStore.addTransaction.mock.calls[0][2]).toBe('Car');

        expect(history.push).toHaveBeenCalledWith('/');
        expect(amountStore.setValue).toHaveBeenCalledWith(0);
    });

    it('adds a new groceries transaction and redirects to / upon clicking the groceries button', () => {
        const amountStore = {
            value: jest.fn(() => 123.00),
            setValue: jest.fn()
        };
        const transactionStore = {
            addTransaction: jest.fn()
        };
        const history = {
            push: jest.fn()
        };

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        submitTransactionMenu.find('.SubmitTransactionMenu-Categories-Groceries').simulate('click');
        expect(transactionStore.addTransaction).toHaveBeenCalledTimes(1);
        expect(transactionStore.addTransaction.mock.calls[0][0]).toBeCloseTo(123.00);
        expect(transactionStore.addTransaction.mock.calls[0][1]).toBeInstanceOf(Date);
        expect(transactionStore.addTransaction.mock.calls[0][2]).toBe('Groceries');

        expect(history.push).toHaveBeenCalledWith('/');
        expect(amountStore.setValue).toHaveBeenCalledWith(0);
    });

    it('does not add a new transaction or redirect when there is no amount', () => {
        const amountStore = {
            value: jest.fn(() => null)
        };
        const transactionStore = {
            addTransaction: jest.fn()
        };
        const history = {
            push: jest.fn()
        };

        const submitTransactionMenu = shallow(<SubmitTransactionMenu
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        submitTransactionMenu.find('.SubmitTransactionMenu-Categories-General').simulate('click');
        expect(transactionStore.addTransaction).not.toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalledWith('/');
    });
});
