import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import BudgetSummaryPage from 'ui/summary/BudgetSummaryPage';
import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import DailyBudgetPage from 'ui/settings/DailyBudgetPage';
import DailyBudgetEditPage from 'ui/settings/DailyBudgetEditPage';
import ValueStore from 'state/ValueStore';


class AppRoutes extends React.Component {
    constructor(props) {
        super(props);
        this._categoryStore = new ValueStore();
        this._dailyBudgetStore = new ValueStore();
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
                        amountStore={this.props.appStore.amountStore()}
                        categoryStore={this._categoryStore}
                        transactionStore={this.props.appStore.transactionStore()}
                        history={history}
                        location={this.props.location}
                    />)}
                />

                <Route path="/daily_budget" render={({ history }) => (
                    <DailyBudgetPage
                        location={this.props.location} />)}
                />

                <Route path="/daily_budget_edit" render={({ history }) => (
                    <DailyBudgetEditPage
                        dailyBudgetStore={this._dailyBudgetStore}
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
