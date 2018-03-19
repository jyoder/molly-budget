import React from 'react';
const reactRouterDom = require('react-router-dom');

// Just render a plain div with its children
reactRouterDom.BrowserRouter = ({children}) => <div>{children}</div>
module.exports = reactRouterDom;
