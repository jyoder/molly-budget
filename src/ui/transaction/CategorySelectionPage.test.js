import CategorySelectionPage from 'ui/transaction/CategorySelectionPage';
import SubmitTransactionMenu from 'ui/transaction/SubmitTransactionMenu';

import React from 'react';
import { shallow } from 'enzyme';


describe('CategroySelectionPage', () => {
    it('renders the SubmitTransactionMenu', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = { push: jest.fn() };
        const categorySelectionPage = shallow(<CategorySelectionPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);
        
        expect(categorySelectionPage.find(SubmitTransactionMenu)).toHaveLength(1);
    });

    it('redirects back to the transaction entry page when the user clicks the back button', () => {
        const amountStore = { setValue: jest.fn() };
        const transactionStore = {};
        const history = { push: jest.fn() };
        const categorySelectionPage = shallow(<CategorySelectionPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        const backButton = categorySelectionPage.find('.CategorySelectionPage-backButton'); 
        backButton.simulate('click');
        
        expect(history.push).toHaveBeenCalledWith('/transactions');
        expect(amountStore.setValue).not.toHaveBeenCalled();
    });
});
