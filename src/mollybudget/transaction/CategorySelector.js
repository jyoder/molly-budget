import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FontAwesome from 'react-fontawesome';
import CategoryIconMapper from 'mollybudget/transaction/CategoryIconMapper';

import 'mollybudget/transaction/CategorySelector.css';


const DEFAULT_CATEGORY = 'General';

class CategorySelector extends React.Component {
    componentWillMount() {
        this.props.categoryStore.setValue(DEFAULT_CATEGORY);
    }

    render() {
        return(
            <div className="CategorySelector">
                {this._category('General')}
                {this._category('Outing')}
                {this._category('Car')}
                {this._category('Groceries')}
                {this._category('Income')}
            </div>
        );
    }

    _category(categoryName) {
        return(
            <div
                className={this._categoryClasses(categoryName)}
                onClick={() => this._select(categoryName)}>
                
                <FontAwesome name={CategoryIconMapper.toIcon(categoryName)} />
                <p className="Category-label">{categoryName}</p>
            </div>
        );
    }

    _categoryClasses(categoryName) {
        const classes = [`Category-${categoryName.toLowerCase()}`];
        if(this._isSelected(categoryName)) {
            classes.push(`Category--selected`);
        }
        return classes.join(' ');
    }

    _select(categoryName) {
        this.props.categoryStore.setValue(categoryName);
    }

    _isSelected(categoryName) {
        return categoryName === this.props.categoryStore.value();
    }
}

CategorySelector.propTypes = {
    categoryStore: PropTypes.object.isRequired
};

export default observer(CategorySelector);
