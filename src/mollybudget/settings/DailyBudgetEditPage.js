import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import NumberPad from 'mollybudget/numpad/NumberPad';
import { Button } from 'reactstrap';

import 'mollybudget/app/AppPage.css';


class DailyBudgetEditPage extends React.Component {
    render() {
        return(
            <div className="AppPage">
                <div>
                    <p className="DailyBudgetEditPage-dailyBudget lead">
                        Your daily budget is <strong>${this._dailyBudget()}</strong>
                    </p>

                    <NumberPad valueStore={this.props.budgetInputStore} />
                </div>

                <div>
                    <Button
                        outline
                        block
                        className="DailyBudgetEditPage-saveChange"
                        onClick={() => this._onClickSaveChange()}>
                        Save Changes
                    </Button>

                    <Button
                        outline
                        block
                        className="DailyBudgetEditPage-goBack"
                        onClick={() => this._onClickGoBack()}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    _onClickSaveChange() {
        this.props.dailyBudgetStore.addDailyBudget(this._dailyBudget(), new Date());
        this.props.history.push('/settings/daily_budget');
    }

    _onClickGoBack() {
        this.props.history.push('/settings/daily_budget');
    }

    _dailyBudget() {
        if(this.props.budgetInputStore.value() !== null) {
            return Math.trunc(this.props.budgetInputStore.value());
        } else {
            return this.props.dailyBudgetStore.currentDailyBudget().amount();
        }
    }
}

DailyBudgetEditPage.propTypes = {
    budgetInputStore: PropTypes.object.isRequired,
    dailyBudgetStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(DailyBudgetEditPage);
