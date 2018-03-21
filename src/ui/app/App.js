import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import AppLayout from 'ui/app/AppLayout';
import AppRoutes from 'ui/app/AppRoutes';
import AuthenticationIndicator from 'ui/auth/AuthenticationIndicator';
import Budget from 'state/Budget';


class App extends React.Component {
    render() {
        return(
            <AppLayout>
                {this._content()}
            </AppLayout>
        );
    }

    _content() {
        if(this.props.appStore.initialized) {
            return(<AppRoutes appStore={this.props.appStore} budget={this._budget()} />);
        } else {
            return(<AuthenticationIndicator />);
        }
    }

    _budget() {
        return Budget.create(
            40.00,
            this.props.appStore.transactionStore().transactions()
        );
    }
}

App.propTypes = {
    appStore: PropTypes.object.isRequired
};

export default observer(App);
