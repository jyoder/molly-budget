import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import NavigationMenu from 'ui/app/NavigationMenu';

import 'ui/app/AppLayout.css';


class AppLayout extends React.Component {
    render() {
        return(
            <div className="AppLayout">
                <header className="AppLayout-header">
                    <NavigationMenu location={this.props.location} />
                </header>

                <content className="AppLayout-content">
                    {this.props.children}
                </content>
            </div>
        );
    }
}

AppLayout.propTypes = {
    location: PropTypes.object.isRequired
};

export default observer(AppLayout);
