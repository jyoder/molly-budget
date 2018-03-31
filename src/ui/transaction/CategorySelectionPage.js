import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';
import NumberPadDisplay from 'ui/numpad/NumberPadDisplay';
import SubmitTransactionMenu from 'ui/transaction/SubmitTransactionMenu';

import 'ui/app/AppPage.css';


class CategorySelectionPage extends React.Component {
    render() {
        return(
            <section className="CategorySelectionPage AppPage">
                <NumberPadDisplay
                    className="CategorySelectionPage-NumberPadDisplay"
                    valueStore={this.props.amountStore}
                />

                <br />
                
                <SubmitTransactionMenu
                    className="CategorySelectionPage-SubmitTransactionMenu"
                    amountStore={this.props.amountStore}
                    transactionStore={this.props.transactionStore}
                    history={this.props.history}
                />

                <br />

                <Button
                    outline
                    block
                    className="CategorySelectionPage-backButton"
                    onClick={() => this._onClick()}>Go Back
                </Button>
            </section>
        );
    }

    _onClick() {
        this.props.history.push('/transactions');
    }
}

CategorySelectionPage.propTypes = {
    amountStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(CategorySelectionPage);
