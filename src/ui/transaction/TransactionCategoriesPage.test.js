import TransactionCategoriesPage from 'ui/transaction/TransactionCategoriesPage';
import CategoriesMenu from 'ui/transaction/CategoriesMenu';

import React from 'react';
import { shallow } from 'enzyme';


describe('TransactionCategoriesPage', () => {
    it('renders the CategoriesMenu', () => {
        const amountStore = {};
        const transactionStore = {};
        const history = { push: jest.fn() };
        const transactionCategoriesPage = shallow(<TransactionCategoriesPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);
        
        expect(transactionCategoriesPage.find(CategoriesMenu)).toHaveLength(1);
    });

    it('redirects back to the transaction entry page when the user clicks the back button', () => {
        const amountStore = { setValue: jest.fn() };
        const transactionStore = {};
        const history = { push: jest.fn() };
        const transactionCategoriesPage = shallow(<TransactionCategoriesPage
            amountStore={amountStore}
            transactionStore={transactionStore}
            history={history}
        />);

        const backButton = transactionCategoriesPage.find('.TransactionCategoriesPage-backButton'); 
        backButton.simulate('click');
        
        expect(history.push).toHaveBeenCalledWith('/transactions/amount');
        expect(amountStore.setValue).not.toHaveBeenCalled();
    });
});
