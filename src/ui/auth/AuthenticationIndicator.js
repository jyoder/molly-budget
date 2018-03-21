import React from 'react';
import { BeatLoader } from 'react-spinners';

import 'ui/auth/AuthenticationIndicator.css';


export default class AuthenticationIndicator extends React.Component {
    render() {
        return(
            <div className="AuthenticationIndicator">
                <h1 className="AuthenticationIndicator-heading lead">
                    Logging In
                </h1>
                <BeatLoader color="#000222"/>
            </div>
        );
    }
}
