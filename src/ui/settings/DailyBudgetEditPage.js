import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import NumberPad from 'ui/numpad/NumberPad';

import 'ui/app/AppPage.css';


const DEFAULT_DAILY_BUDGET = 40;

class DailyBudgetEditPage extends React.Component {
    render() {
        return(
            <div className="AppPage">
                <p className="DailyBudgetEditPage-dailyBudget lead">
                    Your daily budget is <strong>${this._dailyBudget()}</strong>
                </p>

                <NumberPad valueStore={this.props.dailyBudgetStore} />
            </div>
        );
    }

    _dailyBudget() {
        if(this.props.dailyBudgetStore.value() !== null) {
            return Math.trunc(this.props.dailyBudgetStore.value());
        } else {
            return DEFAULT_DAILY_BUDGET;
        }
    }
}

DailyBudgetEditPage.propTypes = {
    dailyBudgetStore: PropTypes.object.isRequired
};

export default observer(DailyBudgetEditPage);
