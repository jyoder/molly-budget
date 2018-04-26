import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import 'ui/transaction/TransactionsIndexPage.css';
import 'ui/app/AppPage.css';


class TransactionsIndexPage extends React.Component {
    render() {
        if(this.props.transactionsIndexView.transactionDayViews().length > 0) {
            return this._transactionsTable();
        } else {
            return this._noTransactionsMessage();
        }
    }

    _transactionsTable() {
        return(
            <section className="TransactionsIndexPage">
                <Table size="sm">
                    <tbody>
                        {this._transactionRowsByDay()}
                    </tbody>
                </Table>
            </section>
        );
    }

    _noTransactionsMessage() {
        return(
            <section className="AppPage">
                <p className="lead">You haven't added any transactions.</p>
            </section>
        )
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
            <tr key={transactionDayView.dateKey()}>
                <td className="TransactionsIndexPage-date" colSpan="3">
                    {transactionDayView.date()}
                </td>
            </tr>
        );
    }

    _totalRow(transactionDayView) {
        return(
            <tr key={transactionDayView.totalKey()}>
                <td className="TransactionsIndexPage-categoryIcon">
                </td>
                <td className="TransactionsIndexPage-totalLabel">
                    Total
                </td>
                <td className={`TransactionsIndexPage-total ${transactionDayView.totalClass()}`}>
                    {transactionDayView.total()}
                </td>
            </tr>
        );
    }

    _transactionRow(transactionRowView) {
        return(
            <tr key={transactionRowView.key()}>
                <td className="TransactionsIndexPage-categoryIcon">
                    <FontAwesome name={transactionRowView.categoryIcon()} />
                </td>
                <td className="TransactionsIndexPage-category">
                     {transactionRowView.category()}
                </td>
                <td className={`TransactionsIndexPage-amount ${transactionRowView.amountClass()}`}>
                    {transactionRowView.amount()}
                </td>
            </tr>
        );
    }
}

TransactionsIndexPage.propTypes = {
    transactionsIndexView: PropTypes.object.isRequired
};

export default observer(TransactionsIndexPage);
