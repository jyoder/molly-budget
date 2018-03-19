import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BudgetSummary from 'ui/summary/BudgetSummaryPage';
import Transactions from 'ui/transaction/TransactionsPage';


export default class AppRoutes extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={({ history }) => (
                            <BudgetSummary
                                user={this.props.user}
                                budget={this.props.budget}
                                history={history}
                            />)}
                        />
                    
                        <Route path="/transactions" render={({ history }) => (
                            <Transactions
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
    user: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired
};
