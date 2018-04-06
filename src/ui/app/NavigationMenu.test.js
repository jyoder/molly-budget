import React from 'react';
import { shallow } from 'enzyme';

import NavigationMenu from 'ui/app/NavigationMenu';
import { Navbar, NavbarToggler, Collapse } from 'reactstrap';


describe('NavigationMenu', () => {
    it('renders the Navbar in a collapsed state initially', () => {
        const navigationMenu = shallow(<NavigationMenu />);
        expect(navigationMenu.find(Collapse).props().isOpen).toBeFalsy();
    });

    it('expands the Navbar when the NavbarToggler is clicked', () => {
        const navigationMenu = shallow(<NavigationMenu />);
        navigationMenu.find(NavbarToggler).simulate('click');
        expect(navigationMenu.find(Collapse).props().isOpen).toBeTruthy();
    });

    it('collapses the Navbar when the NavbarToggler is clicked a second time', () => {
        const navigationMenu = shallow(<NavigationMenu />);
        navigationMenu.find(NavbarToggler).simulate('click');
        navigationMenu.find(NavbarToggler).simulate('click');
        expect(navigationMenu.find(Collapse).props().isOpen).toBeFalsy();
    });
});
