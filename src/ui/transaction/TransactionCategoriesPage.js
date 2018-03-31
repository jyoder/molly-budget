import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';
import NumberPadDisplay from 'ui/numpad/NumberPadDisplay';
import CategoriesMenu from 'ui/transaction/CategoriesMenu';

import 'ui/app/AppPage.css';


class TransactionCategoriesPage extends React.Component {
    render() {
        return(
            <section className="TransactionCategoriesPage AppPage">
                <NumberPadDisplay
                    className="TransactionCategoriesPage-NumberPadDisplay"
                    valueStore={this.props.amountStore}
                />

                <br />
                
                <CategoriesMenu
                    className="TransactionCategoriesPage-CategoriesMenu"
                    amountStore={this.props.amountStore}
                    transactionStore={this.props.transactionStore}
                    history={this.props.history}
                />

                <br />

                <Button
                    outline
                    block
                    className="TransactionCategoriesPage-backButton"
                    onClick={() => this._onClick()}>Go Back
                </Button>
            </section>
        );
    }

    _onClick() {
        this.props.history.push('/transactions/amount');
    }
}

TransactionCategoriesPage.propTypes = {
    amountStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(TransactionCategoriesPage);
