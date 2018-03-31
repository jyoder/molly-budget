import React from 'react';
import { observer } from 'mobx-react';

import 'ui/app/AppLayout.css';


class AppLayout extends React.Component {
    render() {
        return(
            <div className="AppLayout">
                <header className="AppLayout-header">
                    <h4 className="AppLayout-heading">MollyBudget</h4>
                </header>

                <section className="AppLayout-content">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default observer(AppLayout);
