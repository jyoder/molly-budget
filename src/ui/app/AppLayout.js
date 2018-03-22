import React from 'react';
import { observer } from 'mobx-react';

import 'ui/app/AppLayout.css';


class AppLayout extends React.Component {
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

export default observer(AppLayout);
