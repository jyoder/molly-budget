import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

export default class NavigationMenu extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            collapsed: true
        };
    }

    render() {
        return (
            <div>
                <Navbar dark style={ { backgroundColor: '#222' } } fixed="top">
                    <NavbarBrand href="/">MollyBudget</NavbarBrand>
                    <NavbarToggler onClick={() => { this._onTogglerClicked() }} />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink onClick href="/daily_budget">Daily Budget Amount</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

    _onTogglerClicked() {
        this.setState((state) => ({
            collapsed: !state.collapsed
        }));
    }
}
