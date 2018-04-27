import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import TransactionsIndexPage from 'mollybudget/transaction/ui/TransactionsIndexPage';
import TransactionAmountPage from 'mollybudget/transaction/ui/TransactionAmountPage';

import TransactionsIndexView from 'mollybudget/transaction/ui/TransactionsIndexView';
import TransactionHistory from 'mollybudget/transaction/TransactionHistory';

import ValueStore from 'mollybudget/state/ValueStore';


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
                        transactionsIndexView={this._transactionsIndexView()}
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

    _transactionsIndexView() {
        return new TransactionsIndexView(
            (new Date()).getMonth(),
            new TransactionHistory(
                this.props.transactionStore.transactions()
            )
        );
    }
}

TransactionRoutesPage.propTypes = {
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(TransactionRoutesPage);
