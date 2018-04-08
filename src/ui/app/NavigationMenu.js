import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';


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
                            {this._navItem('/daily_budget', 'Daily Budget Amount')}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

    _navItem(pathname, description) {
        return(
            <NavItem>
                <NavLink tag={Link} to={pathname}
                    onClick={() => this._collapseNavBar() }
                    active={this.props.location.pathname === pathname}>
                    {description}
                </NavLink>
            </NavItem>
        );
    }

    _onTogglerClicked() {
        this.setState((state) => ({
            collapsed: !state.collapsed
        }));
    }

    _collapseNavBar() {
        this.setState({
            collapsed: true
        });
    }
}

NavigationMenu.propTypes = {
    location: PropTypes.object.isRequired
}