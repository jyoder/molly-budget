import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';

import DailyBudgetPage from 'mollybudget/settings/ui/DailyBudgetPage';
import DailyBudgetEditPage from 'mollybudget/settings/ui/DailyBudgetEditPage';
import ValueStore from 'mollybudget/state/ValueStore';


class SettingsRoutes extends React.Component {
    constructor(props) {
        super(props);
        this._budgetInputStore = new ValueStore();
    }

    render() {
        return(
            <Switch>
                <Route exact path="/settings/daily_budget" render={({ history }) => (
                    <DailyBudgetPage
                        dailyBudgetStore={this.props.dailyBudgetStore}
                        history={history} 
                    />
                )} />

                <Route path="/settings/daily_budget/edit" render={({ history }) => (
                    <DailyBudgetEditPage
                        budgetInputStore={this._budgetInputStore}
                        dailyBudgetStore={this.props.dailyBudgetStore}
                        history={history}
                    />
                )} />
            </Switch>
        );
    }

    _currentDailyBudget() {
        return this.props.dailyBudgetStore.currentDailyBudget().amount();
    }
}

SettingsRoutes.propTypes = {
    dailyBudgetStore: PropTypes.object.isRequired
};

export default observer(SettingsRoutes);
