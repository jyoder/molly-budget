import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import NavigationMenu from 'ui/app/NavigationMenu';

import 'ui/app/AppLayout.css';

import {TransitionGroup, CSSTransition} from 'react-transition-group';
import 'ui/app/Transition.css';

class AppLayout extends React.Component {
    render() {
        return(
            <div className="AppLayout">
                <header className="AppLayout-header">
                    <NavigationMenu location={this.props.location} />
                </header>

                <TransitionGroup component={null}>
                    <CSSTransition key={this.props.location.key} timeout={100} classNames="cross-fade">
                        <div className="AppLayout-content" key={this.props.location.key}>
                            {this.props.children}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

AppLayout.propTypes = {
    location: PropTypes.object.isRequired
};

export default observer(AppLayout);
