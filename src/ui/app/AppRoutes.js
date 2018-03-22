import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BudgetSummaryPage from 'ui/summary/BudgetSummaryPage';
import TransactionsPage from 'ui/transaction/TransactionsPage';


class AppRoutes extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={({ history }) => (
                            <BudgetSummaryPage
                                user={this.props.appStore.user()}
                                budget={this.props.budget}
                                history={history}
                            />)}
                        />
                    
                        <Route path="/transactions" render={({ history }) => (
                            <TransactionsPage
                                transactionStore={this.props.appStore.transactionStore()}
                                history={history}
                            />)}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

AppRoutes.propTypes = {
    appStore: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired
};

export default observer(AppRoutes);
