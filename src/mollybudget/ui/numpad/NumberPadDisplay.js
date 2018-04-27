import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { formatCurrency } from 'mollybudget/ui/format/CurrencyFormat';


class NumberPadDisplay extends React.Component {
    render() {
        return <p className="NumberPadDisplay h1">${this._number()}</p>
    }

    _number() {
        return formatCurrency(this._value());
    }

    _value() {
        const value = this.props.valueStore.value();
        return value ? value : 0.0;
    }
}

NumberPadDisplay.propTypes = {
    valueStore: PropTypes.object.isRequired
};

export default observer(NumberPadDisplay);
