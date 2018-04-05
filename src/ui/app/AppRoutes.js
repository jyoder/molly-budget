import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BudgetSummaryPage from 'ui/summary/BudgetSummaryPage';
import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import ValueStore from 'state/ValueStore';


class AppRoutes extends React.Component {
    constructor(props) {
        super(props);
        this._categoryStore = new ValueStore();
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/" render={({ history }) => (
                        <BudgetSummaryPage
                            user={this.props.appStore.user()}
                            budget={this.props.budget}
                            history={history}
                        />)}
                    />
                    
                    <Route path="/transactions" render={({ history }) => (
                        <TransactionAmountPage
                            amountStore={this.props.appStore.amountStore()}
                            categoryStore={this._categoryStore}
                            transactionStore={this.props.appStore.transactionStore()}
                            history={history}
                        />)}
                    />
                </Switch>
            </Router>
        );
    }
}

AppRoutes.propTypes = {
    appStore: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired
};

export default observer(AppRoutes);
