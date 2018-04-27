import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import FloatBuilder from 'mollybudget/ui/numpad/FloatBuilder';
import ValueStore from 'mollybudget/state/ValueStore';

import 'mollybudget/ui/numpad/NumberPad.css';


class NumberPad extends React.Component {
    constructor(props) {
        super(props);
        this._floatBuilderStore = new ValueStore();
        this._floatBuilderStore.setValue(new FloatBuilder());
    }

    render() {
        const builder = this._floatBuilderStore.value();

        return(
            <div className="NumberPad">
                <div className="NumberPad-row">
                    {this._button('1', () => this._onClick(builder.one()))}
                    {this._button('2', () => this._onClick(builder.two()))}
                    {this._button('3', () => this._onClick(builder.three()))}
                </div>

                <div className="NumberPad-row">
                    {this._button('4', () => this._onClick(builder.four()))}
                    {this._button('5', () => this._onClick(builder.five()))}
                    {this._button('6', () => this._onClick(builder.six()))}
                </div>

                <div className="NumberPad-row">
                    {this._button('7', () => this._onClick(builder.seven()))}
                    {this._button('8', () => this._onClick(builder.eight()))}
                    {this._button('9', () => this._onClick(builder.nine()))}
                </div>

                <div className="NumberPad-row">
                    {this._button('0', () => this._onClick(builder.zero()))}
                    {this._button('.', () => this._onClick(builder.point()))}
                    {this._button('C', () => this._onClick(builder.clear()))}
                </div>
            </div>
        )
    }

    _button(type, onClick) {
        return(
            <Button outline className={this._buttonClasses(type)} onClick={onClick}>
                {type}
            </Button>
        );
    }

    _buttonClasses(type) {
        const classes = ['NumberPad-button'];
        if(type === '.') {
            classes.push('NumberPad-buttonPoint');
        } else if(type === 'C') {
            classes.push('NumberPad-buttonClear');
        } else {
            classes.push(`NumberPad-button${type}`);
        }
        return classes.join(' ');
    }

    _onClick(floatBuilder) {
        this._floatBuilderStore.setValue(floatBuilder);
        this.props.valueStore.setValue(this._floatBuilderStore.value().toFloat());
    }
}

NumberPad.propTypes = {
    valueStore: PropTypes.object.isRequired
};

export default observer(NumberPad);
