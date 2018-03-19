import React from 'react';
import PropTypes from 'prop-types';

import FirebaseAuthenticator from 'network/FirebaseAuthenticator';
import FirebaseProvider from 'network/FirebaseProvider';
import FirebaseConfigProvider from 'network/FirebaseConfigProvider';
import Environment from 'environment/Environment';
import Budget from 'state/Budget';

import AppLayout from 'ui/app/AppLayout';
import AppRoutes from 'ui/app/AppRoutes';
import AuthenticationIndicator from 'ui/auth/AuthenticationIndicator';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { user: null };
    }

    componentWillMount() {
        FirebaseAuthenticator.create(this._firebase()).authenticate((user) => {
            this.setState({ user: user });
        });
    }

    render() {
        return(
            <AppLayout>
                {this._content()}
            </AppLayout>
        );
    }

    _firebase() {
        if(this.props.firebase) {
            return this.props.firebase;
        } else {
            return this._firebaseProvider().getFirebase();
        }
    }

    _firebaseProvider() {
        return FirebaseProvider.create(
            new FirebaseConfigProvider(Environment.instance())
        );
    }

    _content() {
        if(this.state.user) {
            return(<AppRoutes user={this.state.user} budget={this._budget()} />);
        } else {
            return(<AuthenticationIndicator />);
        }
    }

    _budget() {
        return Budget.create(40.00);
    }
}

App.propTypes = {
    firebase: PropTypes.object
};
