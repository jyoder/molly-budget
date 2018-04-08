import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import NavigationMenu from 'ui/app/NavigationMenu';

import 'ui/app/AppLayout.css';


class AppLayout extends React.Component {
    render() {
        return(
            <div className="AppLayout">
                <section className="AppLayout-header">
                    <NavigationMenu location={this.props.location} />
                </section>

                <section className="AppLayout-content">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

AppLayout.propTypes = {
    location: PropTypes.object.isRequired
};

export default observer(AppLayout);
