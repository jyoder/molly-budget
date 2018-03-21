import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import CurrencyInput from 'ui/transaction/CurrencyInput';
import CurrencyAmountStore from 'ui/transaction/CurrencyAmountStore';
import SubmitTransactionButton from 'ui/transaction/SubmitTransactionButton';


class TransactionsPage extends React.Component {
    constructor(props) {
        super(props);
        this._currencyAmountStore = new CurrencyAmountStore();
    }

    render() {
        return(
            <section>
                <CurrencyInput
                    currencyAmountStore={this._currencyAmountStore}
                />
                
                <br />
                
                <SubmitTransactionButton
                    currencyAmountStore={this._currencyAmountStore}
                    transactionStore={this.props.transactionStore}
                    history={this.props.history}
                />
            </section>
        );
    }
}

TransactionsPage.propTypes = {
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(TransactionsPage);
