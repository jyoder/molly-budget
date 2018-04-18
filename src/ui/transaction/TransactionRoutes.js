import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import TransactionsIndexPage from 'ui/transaction/TransactionsIndexPage';
import TransactionAmountPage from 'ui/transaction/TransactionAmountPage';
import ValueStore from 'state/ValueStore';


class TransactionRoutesPage extends React.Component {
    constructor(props) {
        super(props);

        this._amountStore = new ValueStore();
        this._categoryStore = new ValueStore();
    }

    render() {
        return(
            <Switch>
                <Route exact path="/transactions" render={({ history }) => (
                    <TransactionsIndexPage
                        transactionStore={this.props.transactionStore}
                        history={history} 
                    />
                )} />

                <Route path="/transactions/new" render={({ history }) => (
                    <TransactionAmountPage
                        amountStore={this._amountStore}
                        categoryStore={this._categoryStore}
                        transactionStore={this.props.transactionStore}
                        history={history} 
                    />
                )} />
            </Switch>
        );
    }
}

TransactionRoutesPage.propTypes = {
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(TransactionRoutesPage);