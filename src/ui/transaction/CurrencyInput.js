import React from 'react';
import { observer } from 'mobx-react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

import 'ui/transaction/CurrencyInput.css';


class CurrencyInput extends React.Component {
    render() {
        return(
            <div className="CurrencyInput">                    
                <Input
                    type="number"
                    step="0.1"
                    onChange={(event) => this._onChange(event)}
                    placeholder="Enter transaction amount"
                    bsSize="lg"
                />             
            </div>
        );
    }

    _onChange(event) {
        this.props.currencyAmountStore.setAmount(event.target.value);
    }
}

CurrencyInput.propTypes = {
    currencyAmountStore: PropTypes.object.isRequired
};

export default observer(CurrencyInput);
