import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';

import DailyBudgetPage from 'ui/settings/DailyBudgetPage';
import DailyBudgetEditPage from 'ui/settings/DailyBudgetEditPage';
import ValueStore from 'state/ValueStore';


class SettingsRoutes extends React.Component {
    constructor(props) {
        super(props);
        this._dailyBudgetStore = new ValueStore();
    }

    render() {
        return(
            <Switch>
                <Route exact path="/settings/daily_budget" render={({ history }) => (
                    <DailyBudgetPage
                        history={history} 
                    />
                )} />

                <Route path="/settings/daily_budget/edit" render={({ history }) => (
                    <DailyBudgetEditPage
                        dailyBudgetStore={this._dailyBudgetStore}
                        history={history}
                    />
                )} />
            </Switch>
        );
    }
}

export default observer(SettingsRoutes);
