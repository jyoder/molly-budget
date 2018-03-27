import React from 'react';
import { observer } from 'mobx-react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';

import 'ui/transaction/CurrencyInput.css';


class CurrencyInput extends React.Component {
    render() {
        return(
            <div className="CurrencyInput">
                <InputGroup className="PurchasePage-Amount">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>

                    <Input
                        type="number"
                        step="0.1"
                        placeholder="Enter transaction amount"
                        bsSize="lg"
                        autoFocus
                        onKeyDown={(event) => this._onKeyDown(event)}
                        onChange={(event) => this._onChange(event)}
                    />
                </InputGroup>             
            </div>
        );
    }

    _onKeyDown(event) {
        const target = event.target;
        setTimeout(() => { this.props.currencyAmountStore.setAmount(target.value) }, 0);
    }
    
    _onChange(event) {
        this.props.currencyAmountStore.setAmount(event.target.value);
    }
}

CurrencyInput.propTypes = {
    currencyAmountStore: PropTypes.object.isRequired
};

export default observer(CurrencyInput);
