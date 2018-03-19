import React from 'react';

import 'ui/auth/AuthenticationIndicator.css';


export default class AuthenticationIndicator extends React.Component {
    render() {
        return(
            <h1 className="AuthenticationIndicator lead">
                Authenticating...
            </h1>
        );
    }
}
