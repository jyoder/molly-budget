import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import NumberPadDisplay from 'ui/numpad/NumberPadDisplay';
import NumberPad from 'ui/numpad/NumberPad';
import { Button } from 'reactstrap';

import 'ui/app/AppPage.css';
import 'ui/transaction/TransactionAmountPage.css';


class TransactionAmountPage extends React.Component {
    render() {
        return(
            <section className="TransactionAmountPage AppPage">
                <div className="TransactionAmountPage-numberInput">
                    <NumberPadDisplay valueStore={this.props.amountStore} />
                    <NumberPad valueStore={this.props.amountStore} />
                </div>

                <Button
                    outline
                    block
                    className="TransactionAmountPage-chooseCategoryButton"
                    onClick={() => this._onClickChooseCategory()}>
                    Choose Category
                </Button>

                <Button
                    outline
                    block
                    className="TransactionAmountPage-backButton"
                    onClick={() => this._onClickGoBack()}>
                    Go Back
                </Button>
            </section>
        );
    }

    _onClickChooseCategory() {
        this.props.history.push('/categories');
    }

    _onClickGoBack() {
        this.props.history.push('/');
    }
}

TransactionAmountPage.propTypes = {
    amountStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(TransactionAmountPage);
