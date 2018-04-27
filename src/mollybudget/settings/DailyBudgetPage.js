import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';

import 'mollybudget/ui/app/AppPage.css';


class DailyBudgetPage extends React.Component {
    render() {
        return(
            <div className="AppPage">
                <div>
                    <p className="DailyBudgetPage-dailyBudget lead">
                        Your daily budget is <strong>${this._dailyBudget()}</strong>
                    </p>
                </div>

                <div>
                    <Button
                        outline
                        block
                        className="DailyBudgetPage-edit"
                        onClick={() => this._onClickEdit()}>
                        Edit
                    </Button>
                </div>
            </div>
        );
    }

    _dailyBudget() {
        return this.props.dailyBudgetStore.currentDailyBudget().amount();
    }

    _onClickEdit() {
        this.props.history.push('/settings/daily_budget/edit');
    }
}

DailyBudgetPage.propTypes = {
    dailyBudgetStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default observer(DailyBudgetPage);
