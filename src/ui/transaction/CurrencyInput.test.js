import React from 'react';
import { shallow } from 'enzyme';

import CurrencyInput from 'ui/transaction/CurrencyInput';
import { Input } from 'reactstrap';


describe('CurrencyInput', () => {
    it('sets the amount on the currency amount store', () => {
        const currencyAmountStore = {
            setAmount: jest.fn()
        };
        const currencyInput = shallow(<CurrencyInput currencyAmountStore={currencyAmountStore} />);
        currencyInput.find(Input).simulate('change', {
            target: { value: '123.00' }
        });
        expect(currencyAmountStore.setAmount).toHaveBeenCalledWith('123.00');
    });
});
