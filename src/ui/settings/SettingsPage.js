import React from 'react';

import 'ui/app/AppPage.css';


export default class SettingsPage extends React.Component {
    render() {
        return(
            <div className="AppPage">
                <p className="SettingsPage-dailyBudget lead">
                    Your daily budget is <strong>$40</strong>
                </p>
            </div>
        );
    }
}
