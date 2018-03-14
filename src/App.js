import React from 'react';
import FirebaseProvider from 'network/FirebaseProvider';
import FirebaseAuthenticator from 'network/FirebaseAuthenticator';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { user: null };
    }

    componentWillMount() {
        const firebase = document.firebaseProvider || FirebaseProvider.create().getFirebase();
        FirebaseAuthenticator.create(firebase).authenticate((user) => {
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
}
