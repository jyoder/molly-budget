import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import NumberPadDisplay from 'ui/numpad/NumberPadDisplay';
import NumberPad from 'ui/numpad/NumberPad';
import { Button } from 'reactstrap';

import 'ui/transaction/TransactionsPage.css';


class TransactionsPage extends React.Component {
    render() {
        return(
            <section className="TransactionsPage">
                <div className="TransactionsPage-numberInput">
                    <NumberPadDisplay valueStore={this.props.amountStore} />
                    <NumberPad valueStore={this.props.amountStore} />
                </div>

                <Button
                    size='lg'
                    outline
                    block
                    className="TransactionsPage-button TransactionsPage-chooseCategoryButton"
                    onClick={() => this._onClickChooseCategory()}>
                    Choose Category
                </Button>

                <Button
                    size='lg'
                    outline
                    block
                    className="TransactionsPage-backButton"
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

TransactionsPage.propTypes = {
    amountStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(TransactionsPage);
