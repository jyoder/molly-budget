import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, ButtonGroup } from 'reactstrap';

import 'ui/transaction/SubmitTransactionMenu.css';


class SubmitTransactionMenu extends React.Component {
    render() {
        return(
            <ButtonGroup className="SubmitTransactionMenu-Categories" vertical={true}>
                <Button
                    className="SubmitTransactionMenu-Categories-General"
                    size="lg"
                    disabled={this._disabled()}
                    onClick={() => this._onClick('General')}>
                    General
                </Button>
                
                <Button
                    className="SubmitTransactionMenu-Categories-Outing"
                    size="lg"
                    disabled={this._disabled()}
                    onClick={() => this._onClick('Outing')}>
                    Outing
                </Button>

                <Button
                    className="SubmitTransactionMenu-Categories-Car"
                    size="lg"
                    disabled={this._disabled()}
                    onClick={() => this._onClick('Car')}>
                    Car
                </Button>

                <Button
                    className="SubmitTransactionMenu-Categories-Groceries"
                    size="lg"
                    disabled={this._disabled()}
                    onClick={() => this._onClick('Groceries')}>
                    Groceries
                </Button>
            </ButtonGroup>
        );
    }

    _disabled() {
        return this.props.currencyAmountStore.amount() === null;
    }

    _onClick(category) {
        const amount = this.props.currencyAmountStore.amount();
        if(amount) {
            this.props.transactionStore.addTransaction(amount, new Date(), category);
            this.props.history.push('/');
        }
    }
}

SubmitTransactionMenu.propTypes = {
    currencyAmountStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(SubmitTransactionMenu);
