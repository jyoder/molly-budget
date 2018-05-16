import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import BudgetSummaryPage from 'mollybudget/budget/ui/BudgetSummaryPage';
import TransactionRoutes from 'mollybudget/transaction/ui/TransactionRoutes';
import SettingsRoutes from 'mollybudget/settings/ui/SettingsRoutes';


class AppRoutes extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" render={({ history }) => (
                    <BudgetSummaryPage
                        user={this.props.appStore.user()}
                        budget={this.props.budget}
                        history={history}
                        location={this.props.location}
                    />)}
                />
                
                <Route path="/transactions" render={({ history }) => (
                    <TransactionRoutes
                        transactionStore={this.props.appStore.transactionStore()}
                        dateSnapshot={this.props.dateSnapshot}
                        history={history}
                        location={this.props.location}
                    />)}
                />

                <Route path="/settings" render={({ history }) => (
                    <SettingsRoutes
                        dailyBudgetStore={this.props.appStore.dailyBudgetStore()}
                        location={this.props.location} />)}
                />
            </Switch>
        );
    }
}

AppRoutes.propTypes = {
    appStore: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired,
    dateSnapshot: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default observer(AppRoutes);
