import React from 'react';

import 'AppLayout.css';

export default class AppLayout extends React.Component {
    render() {
        return(
            <div className="AppLayout">
                <header className="AppLayout-header">
                    <h1>MollyBudget</h1>
                </header>

                {this.props.children}
            </div>
        );
    }
}
