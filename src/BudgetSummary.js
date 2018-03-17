import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'format/CurrencyFormat';

import 'BudgetSummary.css';

export default class BudgetSummary extends React.Component {
    render() {
        return(
            <section className="BudgetSummary">
                <p className="BudgetSummary-summary lead">
                    Hello {this._name()},<br />you have <strong>${this._amount()}</strong> to spend today.
                </p>
            </section>
        );
    }

    _name() {
        return this.props.user.displayName;
    }

    _amount() {
        return formatCurrency(this.props.budget.current());
    }
}

BudgetSummary.propTypes = {
    user: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired
};
