import React from 'react';
import { mount, shallow } from 'enzyme';

import NavigationMenu from 'mollybudget/app/NavigationMenu';
import { Navbar, NavbarToggler, Collapse, NavLink } from 'reactstrap';


describe('NavigationMenu', () => {
    it('renders the Navbar in a collapsed state initially', () => {
        const location = { pathname: '/some_path' };
        const navigationMenu = shallow(<NavigationMenu location={location} />);
        expect(navigationMenu.find(Collapse).props().isOpen).toBeFalsy();
    });

    it('expands the Navbar when the NavbarToggler is clicked', () => {
        const location = { pathname: '/some_path' };
        const navigationMenu = shallow(<NavigationMenu location={location} />);
        
        navigationMenu.find(NavbarToggler).simulate('click');
        expect(navigationMenu.find(Collapse).props().isOpen).toBeTruthy();
    });

    it('collapses the Navbar when the NavbarToggler is clicked a second time', () => {
        const location = { pathname: '/some_path' };
        const navigationMenu = shallow(<NavigationMenu location={location} />);
        
        navigationMenu.find(NavbarToggler).simulate('click');
        navigationMenu.find(NavbarToggler).simulate('click');
        expect(navigationMenu.find(Collapse).props().isOpen).toBeFalsy();
    });

    it('collapses the Navbar when a NavLink is clicked', () => {
        const location = { pathname: '/some_path' };
        const navigationMenu = shallow(<NavigationMenu location={location} />);
        
        navigationMenu.find(NavbarToggler).simulate('click');
        expect(navigationMenu.find(Collapse).props().isOpen).toBeTruthy();

        navigationMenu.find(NavLink).simulate('click');
        expect(navigationMenu.find(Collapse).props().isOpen).toBeFalsy();
    });

    it('marks the selected item as active when it matches the current location', () => {
        const location = { pathname: '/settings/daily_budget' };
        const navigationMenu = shallow(<NavigationMenu location={location} />);
        
        navigationMenu.find(NavbarToggler).simulate('click');
        expect(navigationMenu.find(NavLink).props().active).toBeTruthy();
    });

    it('marks the selected item as inactive when it does not match the current location', () => {
        const location = { pathname: '/not_daily_budget' };
        const navigationMenu = shallow(<NavigationMenu location={location} />);
        
        navigationMenu.find(NavbarToggler).simulate('click');
        expect(navigationMenu.find(NavLink).props().active).toBeFalsy();
    });
});
