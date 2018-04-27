import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import AppLayout from 'mollybudget/app/ui/AppLayout';
import AppRoutes from 'mollybudget/app/ui/AppRoutes';
import AuthenticationIndicator from 'mollybudget/auth/ui/AuthenticationIndicator';
import Budget from 'mollybudget/state/Budget';


class App extends React.Component {
    render() {
        return this._initializing() ? this._uninitializedApp() : this._initializedApp();
    }

    _initializing() {
        return !this.props.appStore.initialized;
    }

    _uninitializedApp() {
        return(
            <AppLayout location={this.props.location}>
                <AuthenticationIndicator location={this.props.location} />
            </AppLayout>
        );
    }

    _initializedApp() {
        return(
            <AppLayout location={this.props.location}>
                <AppRoutes
                    appStore={this.props.appStore}
                    budget={this._budget()}
                    location={this.props.location}
                />
            </AppLayout>
        );
    }

    _budget() {
        return Budget.create(
            this.props.appStore.dailyBudgetStore().dailyBudgets(),
            this.props.appStore.transactionStore().transactions()
        );
    }
}

App.propTypes = {
    appStore: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default observer(App);
