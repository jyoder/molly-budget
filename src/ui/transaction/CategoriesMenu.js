import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, ButtonGroup } from 'reactstrap';
import FontAwesome from 'react-fontawesome';


class CategoriesMenu extends React.Component {
    render() {
        return(
            <ButtonGroup className="btn-block" vertical={true}>
                <Button
                    className="CategoriesMenu-General"
                    size="lg"
                    outline
                    disabled={this._disabled()}
                    onClick={() => this._onClick('General')}>
                    <FontAwesome name="dollar" /> General
                </Button>
                
                <Button
                    className="CategoriesMenu-Outing"
                    size="lg"
                    outline
                    disabled={this._disabled()}
                    onClick={() => this._onClick('Outing')}>
                    <FontAwesome name="coffee" /> Outing
                </Button>

                <Button
                    className="CategoriesMenu-Car"
                    size="lg"
                    outline
                    disabled={this._disabled()}
                    onClick={() => this._onClick('Car')}>
                    <FontAwesome name="car" /> Car
                </Button>

                <Button
                    className="CategoriesMenu-Groceries"
                    size="lg"
                    outline
                    disabled={this._disabled()}
                    onClick={() => this._onClick('Groceries')}>
                    <FontAwesome name="shopping-cart" /> Groceries
                </Button>
            </ButtonGroup>
        );
    }

    _disabled() {
        return this.props.amountStore.value() === null;
    }

    _onClick(category) {
        const amount = this.props.amountStore.value();
        if(amount) {
            this.props.transactionStore.addTransaction(amount, new Date(), category);
            this.props.history.push('/');
            this.props.amountStore.setValue(0);
        }
    }
}

CategoriesMenu.propTypes = {
    amountStore: PropTypes.object.isRequired,
    transactionStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(CategoriesMenu);
