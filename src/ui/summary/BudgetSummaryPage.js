import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { formatCurrency } from 'ui/format/CurrencyFormat';

import 'ui/summary/BudgetSummaryPage.css';


class BudgetSummaryPage extends React.Component {
    render() {
        return(
            <section className="BudgetSummaryPage">
                <p className="BudgetSummaryPage-summary lead">
                    Hello {this._name()},<br />you have <strong>${this._amount()}</strong> to spend today.
                </p>

                <Button
                    className='BudgetSummaryPage-addTransaction'
                    size='lg'
                    outline
                    block
                    onClick={() => this._onAddTransactionClicked()}>
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

BudgetSummaryPage.propTypes = {
    user: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(BudgetSummaryPage);
