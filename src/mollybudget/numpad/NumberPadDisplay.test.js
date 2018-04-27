import NumberPadDisplay from 'mollybudget/ui/numpad/NumberPadDisplay';
import ValueStore from 'mollybudget/state/ValueStore';

import React from 'react';
import { shallow } from 'enzyme';


describe('NumberPadDisplay', () => {
    it('renders "$0.00" when the store is empty', () => {
        const valueStore = new ValueStore();
        const numberPadDisplay = shallow(<NumberPadDisplay valueStore={valueStore} />);
        expect(numberPadDisplay.text()).toBe('$0.00');
    });

    it('renders the value in the store in currency format', () => {
        const valueStore = new ValueStore();
        valueStore.setValue(123);

        const numberPadDisplay = shallow(<NumberPadDisplay valueStore={valueStore} />);
        expect(numberPadDisplay.text()).toBe('$123.00');
    });

    it('renders a value of zero in currency format', () => {
        const valueStore = new ValueStore();
        valueStore.setValue(0);

        const numberPadDisplay = shallow(<NumberPadDisplay valueStore={valueStore} />);
        expect(numberPadDisplay.text()).toBe('$0.00');
    });
});
