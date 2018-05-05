import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import 'mollybudget/app/ui/PageTransition.css';


class PageTransition extends React.Component {
    render() {
        return(
            <TransitionGroup component={null}>
                <CSSTransition key={this.props.location.key} timeout={100} classNames="cross-fade">
                    <div className="PageTransition">
                        {this.props.children}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

PageTransition.propTypes = {
    location: PropTypes.object.isRequired
}

export default observer(PageTransition);
