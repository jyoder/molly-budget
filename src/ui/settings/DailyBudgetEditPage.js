import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import NumberPad from 'ui/numpad/NumberPad';
import { Button } from 'reactstrap';

import 'ui/app/AppPage.css';


const DEFAULT_DAILY_BUDGET = 40;

class DailyBudgetEditPage extends React.Component {
    render() {
        return(
            <div className="AppPage">
                <div>
                    <p className="DailyBudgetEditPage-dailyBudget lead">
                        Your daily budget is <strong>${this._dailyBudget()}</strong>
                    </p>

                    <NumberPad valueStore={this.props.dailyBudgetStore} />
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

    _dailyBudget() {
        if(this.props.dailyBudgetStore.value() !== null) {
            return Math.trunc(this.props.dailyBudgetStore.value());
        } else {
            return DEFAULT_DAILY_BUDGET;
        }
    }

    _onClickSaveChange() {
        this.props.history.push('/settings/daily_budget');
    }

    _onClickGoBack() {
        this.props.history.push('/settings/daily_budget');
    }
}

DailyBudgetEditPage.propTypes = {
    dailyBudgetStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(DailyBudgetEditPage);
