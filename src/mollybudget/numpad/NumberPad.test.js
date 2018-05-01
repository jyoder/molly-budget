import NumberPad from 'mollybudget/numpad/NumberPad';
import ValueStore from 'mollybudget/common/model/ValueStore';

import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';


describe('NumberPad', () => {
    it('renders all buttons', () => {
        const numberPad = shallow(<NumberPad valueStore={new ValueStore()}/>);
        expect(numberPad.find(Button)).toHaveLength(12);
        expect(numberPad.find('.NumberPad-button0')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button1')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button2')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button3')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button4')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button5')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button6')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button7')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button8')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-button9')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-buttonPoint')).toHaveLength(1);
        expect(numberPad.find('.NumberPad-buttonClear')).toHaveLength(1);
    });

    it('updates the value in the store when a number button is clicked', () => {
        const valueStore = new ValueStore();
        const numberPad = shallow(<NumberPad valueStore={valueStore} />);
        
        numberPad.find('.NumberPad-button1').simulate('click');
        expect(valueStore.value()).toBeCloseTo(1);
    });

    it('ignores an invalid sequence of button clicks', () => {
        const valueStore = new ValueStore();
        const numberPad = shallow(<NumberPad valueStore={valueStore} />);
        
        numberPad.find('.NumberPad-button2').simulate('click');
        expect(valueStore.value()).toBeCloseTo(2);

        numberPad.find('.NumberPad-button9').simulate('click');
        expect(valueStore.value()).toBeCloseTo(29);

        numberPad.find('.NumberPad-buttonPoint').simulate('click');
        expect(valueStore.value()).toBeCloseTo(29);

        numberPad.find('.NumberPad-button3').simulate('click');
        expect(valueStore.value()).toBeCloseTo(29.3);

        // Second click on the decimal point is invalid
        numberPad.find('.NumberPad-buttonPoint').simulate('click');
        expect(valueStore.value()).toBeCloseTo(29.3);

        numberPad.find('.NumberPad-button4').simulate('click');
        expect(valueStore.value()).toBeCloseTo(29.34);
    });

    it('the digit and decimal point buttons add to the resulting value', () => {
        const valueStore = new ValueStore();
        const numberPad = shallow(<NumberPad valueStore={valueStore} />);

        numberPad.find('.NumberPad-button1').simulate('click');
        numberPad.find('.NumberPad-button2').simulate('click');
        numberPad.find('.NumberPad-button3').simulate('click');
        numberPad.find('.NumberPad-button4').simulate('click');
        numberPad.find('.NumberPad-button5').simulate('click');
        numberPad.find('.NumberPad-button6').simulate('click');
        numberPad.find('.NumberPad-button7').simulate('click');
        numberPad.find('.NumberPad-button8').simulate('click');
        numberPad.find('.NumberPad-button9').simulate('click');
        numberPad.find('.NumberPad-button0').simulate('click');
        numberPad.find('.NumberPad-buttonPoint').simulate('click');
        numberPad.find('.NumberPad-button1').simulate('click');

        expect(valueStore.value()).toBeCloseTo(1234567890.1);
    });

    it('resets the value to 0.0 when the clear button is clicked', () => {
        const valueStore = new ValueStore();
        const numberPad = shallow(<NumberPad valueStore={valueStore} />);

        numberPad.find('.NumberPad-button1').simulate('click');
        numberPad.find('.NumberPad-buttonPoint').simulate('click');
        numberPad.find('.NumberPad-button1').simulate('click');
        expect(valueStore.value()).toBeCloseTo(1.1);

        numberPad.find('.NumberPad-buttonClear').simulate('click');
        expect(valueStore.value()).toBeCloseTo(0.0);
    });
});
