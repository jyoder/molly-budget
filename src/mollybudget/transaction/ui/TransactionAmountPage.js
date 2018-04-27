import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import NumberPadDisplay from 'mollybudget/numpad/NumberPadDisplay';
import NumberPad from 'mollybudget/numpad/NumberPad';
import CategorySelector from 'mollybudget/transaction/ui/CategorySelector';
import { Button } from 'reactstrap';

import 'mollybudget/common/ui/AppPage.css';


class TransactionAmountPage extends React.Component {
    componentWillMount() {
        this.props.amountStore.setValue(null);
    }

    render() {
        return(
            <section className="AppPage">
                <NumberPadDisplay valueStore={this.props.amountStore} />
                <CategorySelector categoryStore={this.props.categoryStore} />   
                <NumberPad valueStore={this.props.amountStore} />

                <div>
                    <Button
                        outline
                        block
                        className="TransactionAmountPage-submitTransaction"
                        onClick={() => this._onClickSubmitTransaction()}
                        disabled={this._submitButtonDisabled()}>
                        Submit Transaction
                    </Button>

                    <Button
                        outline
                        block
                        className="TransactionAmountPage-goBack"
                        onClick={() => this._onClickGoBack()}>
                        Go Back
                    </Button>
                </div>
            </section>
        );
    }

    _onClickSubmitTransaction() {
        this.props.transactionStore.addTransaction(
            this.props.amountStore.value(),
            new Date(),
            this.props.categoryStore.value()
        );
        this.props.history.push('/');
    }

    _onClickGoBack() {
        this.props.history.push('/');
    }

    _submitButtonDisabled() {
        return this.props.amountStore.value() === null ||
            this.props.amountStore.value() === 0.0;
    }
}

TransactionAmountPage.propTypes = {
    amountStore: PropTypes.object.isRequired,
    categoryStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(TransactionAmountPage);
