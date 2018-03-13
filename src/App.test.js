import App from 'App';

import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
    it('renders hello world', () => {
        const app = shallow(<App />);
        expect(app.text()).toBe('Hello world!');
    });
});