import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';


class DailyBudgetEditPage extends React.Component {
    render() {
        return(
            <div className="AppPage">
                <p className="DailyBudgetEditPage-dailyBudget lead">
                    Your daily budget is <strong>${this.props.dailyBudgetStore.value()}</strong>
                </p>
            </div>
        );
    }
}

DailyBudgetEditPage.propTypes = {
    dailyBudgetStore: PropTypes.object.isRequired
};

export default observer(DailyBudgetEditPage);
