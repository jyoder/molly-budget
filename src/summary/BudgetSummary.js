import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import formatCurrency from 'format/CurrencyFormat';

import 'summary/BudgetSummary.css';

export default class BudgetSummary extends React.Component {
    render() {
        return(
            <section className="BudgetSummary">
                <p className="BudgetSummary-summary lead">
                    Hello {this._name()},<br />you have <strong>${this._amount()}</strong> to spend today.
                </p>

                <Button
                    className="BudgetSummary-addTransaction"
                    onClick={this._onAddTransactionClicked.bind(this)}>
                    Add Transaction
                </Button>
            </section>
        );
    }

    _name() {
        return this.props.user.displayName;
    }

    _amount() {
        return formatCurrency(this.props.budget.current());
    }

    _onAddTransactionClicked() {
        this.props.history.push('/transactions');
    }
}

BudgetSummary.propTypes = {
    user: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired
};
