import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';


class TransactionsIndexPage extends React.Component {
    render() {
        return <p>I like turtles.</p>
    }
}

TransactionsIndexPage.propTypes = {
    transactionStore: PropTypes.object.isRequired
};

export default observer(TransactionsIndexPage);
