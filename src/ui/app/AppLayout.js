import React from 'react';
import { observer } from 'mobx-react';
import NavigationMenu from 'ui/app/NavigationMenu';

import 'ui/app/AppLayout.css';


class AppLayout extends React.Component {
    render() {
        return(
            <div className="AppLayout">
                <section className="AppLayout-header">
                    <NavigationMenu />
                </section>

                <section className="AppLayout-content">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default observer(AppLayout);
