import React from 'react';
import { Button } from 'reactstrap';

import 'ui/app/AppPage.css';


export default class DailyBudgetPage extends React.Component {
    render() {
        return(
            <div className="AppPage">
                <div>
                    <p className="DailyBudgetPage-dailyBudget lead">
                        Your daily budget is <strong>$40</strong>
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

                    <Button
                        outline
                        block
                        className="DailyBudgetPage-budgetSummary"
                        onClick={() => this._onClickBudgetSummary()}>
                        Budget Summary
                    </Button>
                </div>
            </div>
        );
    }

    _onClickEdit() {
        this.props.history.push('/settings/daily_budget/edit');
    }

    _onClickBudgetSummary() {
        this.props.history.push('/');
    }
}
