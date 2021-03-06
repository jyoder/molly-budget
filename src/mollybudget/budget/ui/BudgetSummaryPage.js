import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { formatCurrency } from 'mollybudget/format/CurrencyFormat';

import 'mollybudget/common/ui/Page.css';


class BudgetSummaryPage extends React.Component {
    render() {
        return(
            <section className="Page BudgetSummaryPage">
                <p className="BudgetSummaryPage-summary lead">
                    Hello {this._name()},<br />you have <strong>${this._amount()}</strong> to spend today.
                </p>

                <div>
                    <Button
                        className='BudgetSummaryPage-addTransaction'
                        outline
                        block
                        onClick={() => this._onAddTransactionClicked()}>
                        Add Transaction
                    </Button>

                    <Button
                        className='BudgetSummaryPage-viewPastTransactions'
                        outline
                        block
                        onClick={() => this._onViewPastTransactionsClicked()}>
                        View Past Transactions
                    </Button>
                </div>
            </section>
        );
    }

    _name() {
        return this.props.user.displayName;
    }

    _amount() {
        return formatCurrency(this.props.budget.totalToDate(this.props.dateSnapshot));
    }

    _onAddTransactionClicked() {
        this.props.history.push('/transactions/new');
    }

    _onViewPastTransactionsClicked() {
        this.props.history.push('/transactions');
    }
}

BudgetSummaryPage.propTypes = {
    user: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired,
    dateSnapshot: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(BudgetSummaryPage);
