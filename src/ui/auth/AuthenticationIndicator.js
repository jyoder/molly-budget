import React from 'react';
import { BeatLoader } from 'react-spinners';

import 'ui/app/AppPage.css';
import 'ui/auth/AuthenticationIndicator.css';


export default class AuthenticationIndicator extends React.Component {
    render() {
        return(
            <div className="AppPage AuthenticationIndicator">
                <div>
                    <h1 className="AuthenticationIndicator-heading lead">
                        Loading
                    </h1>
                    <BeatLoader color="#000222"/>
                </div>
            </div>
        );
    }
}
