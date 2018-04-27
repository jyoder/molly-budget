import React from 'react';
import { BeatLoader } from 'react-spinners';

import 'mollybudget/auth/ui/LoadingPage.css';


export default class LoadingPage extends React.Component {
    render() {
        return(
            <div className="LoadingPage">
                <h1 className="LoadingPage-heading lead">
                    Loading
                </h1>
                <BeatLoader color="#000222"/>
            </div>
        );
    }
}
