import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import AppLayout from 'mollybudget/app/ui/AppLayout';
import PageTransition from 'mollybudget/app/ui/PageTransition';
import AppRoutes from 'mollybudget/app/ui/AppRoutes';
import LoadingPage from 'mollybudget/app/ui/LoadingPage';
import Budget from 'mollybudget/budget/model/Budget';


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
                <LoadingPage location={this.props.location} />
            </AppLayout>
        );
    }

    _initializedApp() {
        return(
            <AppLayout location={this.props.location}>
                <PageTransition location={this.props.location}>
                <AppRoutes
                    appStore={this.props.appStore}
                    budget={this._budget()}
                    location={this.props.location}
                />
                </PageTransition>
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
