import React from 'react';

import FirebaseAuthenticator from 'network/FirebaseAuthenticator';
import FirebaseProvider from 'network/FirebaseProvider';
import FirebaseConfigProvider from 'network/FirebaseConfigProvider';

import Environment from 'environment/Environment';


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
        if(this.state.user) {
            return(<h1>Hello {this.state.user.displayName}!</h1>);
        } else {
            return(<h1>Authenticating...</h1>);
        }
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
}
