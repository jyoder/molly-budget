import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';


class SubmitTransactionButton extends React.Component {
    render() {
        return(
            <Button size="lg" disabled={this._disabled()} onClick={() => this._onClick()}>
                Submit Transaction
            </Button>
        );
    }

    _disabled() {
        return this.props.currencyAmountStore.amount() === null;
    }

    _onClick() {
        const amount = this.props.currencyAmountStore.amount();
        if(amount) {
            this.props.transactionStore.addTransaction(amount, new Date(), 'General');
            this.props.history.push('/');
        }
    }
}

SubmitTransactionButton.propTypes = {
    currencyAmountStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(SubmitTransactionButton);
