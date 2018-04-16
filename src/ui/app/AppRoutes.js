import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import BudgetSummaryPage from 'ui/summary/BudgetSummaryPage';
import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import SettingsRoutes from 'ui/settings/SettingsRoutes';
import ValueStore from 'state/ValueStore';


class AppRoutes extends React.Component {
    constructor(props) {
        super(props);
        this._amountStore = new ValueStore();
        this._categoryStore = new ValueStore();
    }

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
                    <TransactionAmountPage
                        amountStore={this._amountStore}
                        categoryStore={this._categoryStore}
                        transactionStore={this.props.appStore.transactionStore()}
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
    location: PropTypes.object.isRequired
};

export default observer(AppRoutes);
