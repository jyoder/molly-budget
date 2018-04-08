import React from 'react';
import App from 'ui/app/App';
import AppStoreProvider from 'state/AppStoreProvider';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'index.css';


const appStore = AppStoreProvider.create().getAppStore();

ReactDOM.render(
    <Router>
        <Route render={({location}) => (
            <App appStore={appStore} location={location} />
        )} />
    </Router>,
    document.getElementById('root')
);
