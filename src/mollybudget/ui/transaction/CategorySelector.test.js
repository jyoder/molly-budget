import React from 'react';
import { shallow } from 'enzyme';

import CategorySelector from 'mollybudget/ui/transaction/CategorySelector';
import ValueStore from 'mollybudget/state/ValueStore';


describe('CategorySelector', () => {
    it('renders a "General" category', () => {
        const categorySelector = shallow(<CategorySelector categoryStore={new ValueStore()} />);
        expect(categorySelector.find('.Category-general')).toHaveLength(1);
    });

    it('renders an "Outing" category', () => {
        const categorySelector = shallow(<CategorySelector categoryStore={new ValueStore()} />);
        expect(categorySelector.find('.Category-outing')).toHaveLength(1);
    });

    it('renders a "Car" category', () => {
        const categorySelector = shallow(<CategorySelector categoryStore={new ValueStore()} />);
        expect(categorySelector.find('.Category-car')).toHaveLength(1);
    });

    it('renders an "Groceries" category', () => {
        const categorySelector = shallow(<CategorySelector categoryStore={new ValueStore()} />);
        expect(categorySelector.find('.Category-groceries')).toHaveLength(1);
    });

    it('renders an "Income" category', () => {
        const categorySelector = shallow(<CategorySelector categoryStore={new ValueStore()} />);
        expect(categorySelector.find('.Category-income')).toHaveLength(1);
    });

    it('selects the "General" category by default', () => {
        const valueStore = new ValueStore();
        const categorySelector = shallow(<CategorySelector categoryStore={valueStore} />);
        
        expect(categorySelector
            .find('.Category-general')
            .hasClass('Category--selected')
        ).toBeTruthy();
    });

    it('selects the "General" category when clicked', () => {
        const valueStore = new ValueStore();
        const categorySelector = shallow(<CategorySelector categoryStore={valueStore} />);
        
        categorySelector.find('.Category-general').simulate('click');
        expect(categorySelector
            .find('.Category-general')
            .hasClass('Category--selected')
        ).toBeTruthy();
    });

    it('selects the "Outing" category when clicked', () => {
        const valueStore = new ValueStore();
        const categorySelector = shallow(<CategorySelector categoryStore={valueStore} />);
        
        categorySelector.find('.Category-outing').simulate('click');
        expect(categorySelector
            .find('.Category-outing')
            .hasClass('Category--selected')
        ).toBeTruthy();
    });

    it('selects the "Car" category when clicked', () => {
        const valueStore = new ValueStore();
        const categorySelector = shallow(<CategorySelector categoryStore={valueStore} />);
        
        categorySelector.find('.Category-car').simulate('click');
        expect(categorySelector
            .find('.Category-car')
            .hasClass('Category--selected')
        ).toBeTruthy();
    });

    it('selects the "Groceries" category when clicked', () => {
        const valueStore = new ValueStore();
        const categorySelector = shallow(<CategorySelector categoryStore={valueStore} />);
        
        categorySelector.find('.Category-groceries').simulate('click');
        expect(categorySelector
            .find('.Category-groceries')
            .hasClass('Category--selected')
        ).toBeTruthy();
    });

    it('selects the "Income" category when clicked', () => {
        const valueStore = new ValueStore();
        const categorySelector = shallow(<CategorySelector categoryStore={valueStore} />);
        
        categorySelector.find('.Category-income').simulate('click');
        expect(categorySelector
            .find('.Category-income')
            .hasClass('Category--selected')
        ).toBeTruthy();
    });
});
