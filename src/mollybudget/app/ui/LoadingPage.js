import React from 'react';
import { BeatLoader } from 'react-spinners';

import 'mollybudget/app/ui/LoadingPage.css';
import 'mollybudget/common/ui/Page.css';


export default class LoadingPage extends React.Component {
    render() {
        return(
            <div className="Page LoadingPage">
                <h1 className="LoadingPage-heading lead">
                    Loading
                </h1>
                <BeatLoader />
            </div>
        );
    }
}
