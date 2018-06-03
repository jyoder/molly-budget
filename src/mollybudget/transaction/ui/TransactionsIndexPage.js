import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';

import 'mollybudget/transaction/ui/TransactionsIndexPage.css';
import 'mollybudget/common/ui/Page.css';


class TransactionsIndexPage extends React.Component {
    render() {
        return(
            <section className="TransactionsIndexPage">
                <ul className="TransactionsIndexPage-transactionsList">
                    {this._transactionRowsByDay()}
                </ul>
            </section>
        );
    }

    _transactionRowsByDay() {
        return(
            this.props.transactionsIndexView.transactionDayViews().map(
                (transactionDayView) => this._transactionRows(transactionDayView)
            )
        );
    }

    _transactionRows(transactionDayView) {
        const rows = [this._dateRow(transactionDayView)];
        
        rows.push(
            transactionDayView.transactionRowViews().map(
                (transactionRowView) => this._transactionRow(transactionRowView)
            )
        );
        rows.push(this._totalRow(transactionDayView));

        return rows;
    }

    _dateRow(transactionDayView) {
        return(
            <li key={transactionDayView.dateKey()}
                className="TransactionsIndexPage-transaction TransactionsIndexPage-date">
                    {transactionDayView.date()}
            </li>
        );
    }

    _totalRow(transactionDayView) {
        return(
            <li key={transactionDayView.totalKey()} className="TransactionsIndexPage-transaction">
                <span className="TransactionsIndexPage-categoryIcon">
                </span>
                
                <span className="TransactionsIndexPage-totalLabel">
                    Total
                </span>
                
                <span className={`TransactionsIndexPage-total ${transactionDayView.totalClass()}`}>
                    {transactionDayView.total()}
                </span>
            </li>
        );
    }

    _transactionRow(transactionRowView) {
        return(
            <li key={transactionRowView.key()}>
                {this._transaction(transactionRowView)}
            </li>
        );
    }

    _transaction(transactionRowView) {
        if(transactionRowView.editable()) {
            return this._editableTransaction(transactionRowView);
        } else {
            return this._uneditableTransaction(transactionRowView);
        }
    }

    _editableTransaction(transactionRowView) {
        return this._withSwipeout(this._uneditableTransaction(transactionRowView));
    }

    _uneditableTransaction(transactionRowView) {
        return(
            <div className="TransactionsIndexPage-transaction">
                <span className="TransactionsIndexPage-categoryIcon">
                    <FontAwesome name={transactionRowView.categoryIcon()} />
                </span>
                
                <span className="TransactionsIndexPage-category">
                    {transactionRowView.category()}
                </span>
                
                <span className={`TransactionsIndexPage-amount ${transactionRowView.amountClass()}`}>
                    {transactionRowView.amount()}
                </span>
            </div>
        );
    }

    _withSwipeout(element) {
        return(
            <Swipeout
                right={[
                    {
                        text: 'delete',
                        style: { backgroundColor: 'red', color: 'white' }
                    }
                ]}
            >
                {element}
            </Swipeout>
        )
    }
}

TransactionsIndexPage.propTypes = {
    transactionsIndexView: PropTypes.object.isRequired
};

export default observer(TransactionsIndexPage);
